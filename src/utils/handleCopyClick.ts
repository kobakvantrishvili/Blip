export const handleCopyClick = (str: string | undefined): Promise<void> => {
  if (str) {
    return navigator.clipboard.writeText(str);
  }
  return Promise.reject("String is undefined");
};
