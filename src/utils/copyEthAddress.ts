export const copyEthAddress = (address: string | undefined, setIsCopied: (value: boolean) => void) => {
  if (address) {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }
};
