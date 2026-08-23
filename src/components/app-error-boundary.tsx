import { Component, type ErrorInfo, type ReactNode } from "react";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";

interface AppErrorBoundaryProps {
  children: ReactNode;
}

interface AppErrorBoundaryState {
  error: Error | null;
}

/** Catches errors thrown by the persistent app chrome (header, footer,
 * providers) that sit outside the router's own errorComponent boundary. */
export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return { error };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Intentionally empty: state already holds the error for rendering.
  }

  resetErrorBoundary = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) {
      return this.props.children;
    }

    return (
      <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 p-4 text-center sm:p-6">
        <LogoMark className="size-40 sm:size-48" />
        <div className="flex flex-col gap-2">
          <h1 className="font-head text-4xl sm:text-5xl">Something broke</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            This page failed to load. Retrying often works.
          </p>
          {import.meta.env.DEV ? (
            <pre className="mt-2 overflow-x-auto rounded border-2 bg-muted p-3 text-left text-xs">
              {error.message}
            </pre>
          ) : null}
        </div>
        <Button onClick={this.resetErrorBoundary}>Try again</Button>
      </main>
    );
  }
}
