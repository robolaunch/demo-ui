import { IEnvironment } from "@/interfaces/environment.interface";
import { ITemplate } from "@/interfaces/template.interface";

export function templateFinder(app: IEnvironment, templates: ITemplate[]) {
  return templates.find(
    (template) =>
      app?.applicationConfig?.application?.name === template?.app?.name &&
      app?.applicationConfig?.application?.version === template?.app.version &&
      app?.applicationConfig?.devspace?.ubuntuDistro ===
        template.image.distro &&
      app?.applicationConfig?.devspace?.desktop === template?.image.desktop &&
      app?.applicationConfig?.devspace?.version === template?.image.version,
  );
}
