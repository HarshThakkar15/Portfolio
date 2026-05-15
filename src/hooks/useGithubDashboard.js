import { useCallback, useEffect, useMemo, useState } from "react";
import {
  buildContributionBuckets,
  fetchGithubEvents,
  fetchGithubRepos,
  fetchGithubUser,
  resolveGithubUsername,
  summarizeLanguages,
} from "../services/githubClient";

const emptyState = {
  status: "idle",
  profile: null,
  repositories: [],
  events: [],
  error: "",
};

export default function useGithubDashboard(githubProfileUrl) {
  const username = useMemo(() => resolveGithubUsername(githubProfileUrl), [githubProfileUrl]);
  const [state, setState] = useState(() => ({
    ...emptyState,
    status: resolveGithubUsername(githubProfileUrl) ? "loading" : "idle",
  }));

  const applyReady = useCallback((profile, repositories, events) => {
    setState({
      status: "ready",
      profile,
      repositories: Array.isArray(repositories) ? repositories : [],
      events: Array.isArray(events) ? events : [],
      error: "",
    });
  }, []);

  const applyError = useCallback((message) => {
    setState({
      status: "error",
      profile: null,
      repositories: [],
      events: [],
      error: message,
    });
  }, []);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!username) {
        await Promise.resolve();
        if (!cancelled) {
          applyError("Add a valid GitHub profile URL to your portfolio configuration.");
        }
        return;
      }

      try {
        const [profile, repositories, events] = await Promise.all([
          fetchGithubUser(username),
          fetchGithubRepos(username),
          fetchGithubEvents(username),
        ]);

        if (!cancelled) {
          applyReady(profile, repositories, events);
        }
      } catch (error) {
        if (!cancelled) {
          applyError(error instanceof Error ? error.message : "Unable to load GitHub data.");
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [applyError, applyReady, username]);

  const metrics = useMemo(() => {
    const repos = state.repositories;
    const starsTotal = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0);
    const publicRepos = repos.length;
    const recentActivityCount = state.events.length;
    const ownedNonFork = repos.filter((repo) => !repo.fork);
    const topLanguages = summarizeLanguages(ownedNonFork).slice(0, 6);
    const latestRepos = ownedNonFork.slice(0, 6);
    const contributions = buildContributionBuckets(state.events);

    return {
      starsTotal,
      publicRepos,
      recentActivityCount,
      topLanguages,
      latestRepos,
      contributions,
    };
  }, [state.events, state.repositories]);

  return {
    username,
    status: state.status,
    error: state.error,
    profile: state.profile,
    repositories: state.repositories,
    events: state.events,
    metrics,
    reload: () => {
      void (async () => {
        await Promise.resolve();
        if (!username) {
          applyError("Add a valid GitHub profile URL to your portfolio configuration.");
          return;
        }

        setState((prev) => ({
          ...prev,
          status: "loading",
          error: "",
        }));

        try {
          const [profile, repositories, events] = await Promise.all([
            fetchGithubUser(username),
            fetchGithubRepos(username),
            fetchGithubEvents(username),
          ]);
          applyReady(profile, repositories, events);
        } catch (error) {
          applyError(error instanceof Error ? error.message : "Unable to load GitHub data.");
        }
      })();
    },
  };
}
