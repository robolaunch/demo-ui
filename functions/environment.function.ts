export function templateDesktopViewer(value: string): string {
  if (value?.includes("xfce")) {
    return "Xfce";
  }
  return value;
}

export function templateDistroViewer(value: string): string {
  if (value?.includes("focal")) {
    return "Focal Fossa";
  }

  if (value?.includes("jammy")) {
    return "Jammy Jellyfish";
  }

  return value;
}
