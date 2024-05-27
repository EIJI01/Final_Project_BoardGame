import { Box, Container, TextField, Button } from "@mui/material";
import { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
import html2canvas from "html2canvas";
import GenerateQRcode from "../components/QRcode/GenerateQRcode";

export default function CreateQRcode() {
  const [value, setValue] = useState<string>("");
  const [letter, setLetter] = useState<string>("");
  const qrContainerRef = useRef<HTMLDivElement>(null);

  const handleChangeLetter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLetter(value.toUpperCase());
  };

  const generateQRCode = () => {
    const numberValue = parseInt(value);
    if (isNaN(numberValue) || numberValue <= 0) {
      return null;
    }

    const qrCodes = [];
    for (let i = 1; i <= numberValue; i++) {
      qrCodes.push(
        <div key={i} style={{ marginRight: "10px", marginBottom: "10px" }}>
          <GenerateQRcode value={`${letter}${i}`} size={200} />
        </div>
      );
    }

    return qrCodes;
  };

  const downloadAllQRCode = async () => {
    if (qrContainerRef.current) {
      const qrCodes = qrContainerRef.current.children;
      for (let i = 0; i < qrCodes.length; i++) {
        const canvas = await html2canvas(qrCodes[i] as any);
        const url = canvas.toDataURL("image/png");

        const a = document.createElement("a");
        a.href = url;
        a.download = `qrcode_${i + 1}.png`;
        a.click();
      }
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", gap: 2, justifyContent: "space-between", alignItems: "end" }}>
          <Box sx={{ display: "flex", alignContent: "center", gap: 3 }}>
            <Box>
              <Typography sx={{ fontSize: "14px", mb: 1 }}>Format</Typography>
              <TextField
                id="outlined-password-input"
                autoComplete="current-password"
                label="Input Format"
                onChange={handleChangeLetter}
              />
            </Box>
            <Box>
              <Typography sx={{ fontSize: "14px", mb: 1 }}>Number of generate</Typography>
              <TextField
                type="number"
                id="outlined-password-input"
                autoComplete="current-password"
                label="Input Number For Generate"
                onChange={(e) => setValue(e.target.value)}
              />
            </Box>
          </Box>
          <Box>
            <Button
              onClick={downloadAllQRCode}
              variant="contained"
              sx={{ marginTop: 2, marginBottom: 1 }}
              size="large"
            >
              Download All
            </Button>
          </Box>
        </Box>

        <Box
          ref={qrContainerRef}
          sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 3, justifyContent: "center" }}
        >
          {generateQRCode()}
        </Box>
      </Container>
    </div>
  );
}
