function path(root: string, subLink: string) {
  return `${root}${subLink}`;
}

const ROOT_PATH = "/";

export const APP_PATHS = {
  home: ROOT_PATH,
  login: path(ROOT_PATH, "auth/login"),
  auth: path(ROOT_PATH, "auth"),

  userDetail: (id: string | number) => path(ROOT_PATH, `/${id}`),
};
