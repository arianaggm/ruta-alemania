export function focusApplicationForm(heading: HTMLElement | null): void {
  if (!heading) return;
  heading.focus({ preventScroll: true });
  heading.scrollIntoView({ block: "nearest" });
}

export function restoreApplicationFocus(trigger: HTMLElement | null): boolean {
  if (!trigger?.isConnected) return false;
  trigger.focus();
  return true;
}
