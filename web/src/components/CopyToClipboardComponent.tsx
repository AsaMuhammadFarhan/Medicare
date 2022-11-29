import { Flex, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const CopyToClipboardComponent: React.FC<{ textToCopy: string; }> = ({ children, textToCopy }) => {
  const toast = useToast();

  // Mechanism: Copy to Clipboard
  const [isCopied, setIsCopied] = useState(false);
  const onCopyText = (optional?: string | number) => {
    if (isCopied === false) {
      setIsCopied(true);
      toast({
        title: "Berhasil Menyalin ke Clipboard",
        description: `Teks "${optional}" disalin ke clipboard`,
        position: 'top',
        status: 'success',
        duration: 1500,
        isClosable: true,
      });
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };
  // --

  return (
    <CopyToClipboard
      onCopy={() => onCopyText(textToCopy ?? "")}
      text={textToCopy ?? ""}
    >
      <Flex cursor="pointer" alignItems="center">
        {children}
      </Flex>
    </CopyToClipboard>
  )
};

export default CopyToClipboardComponent;