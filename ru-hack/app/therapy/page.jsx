import { Container, Box } from "@mui/material";

function Page() {
    return (
        <Container>
            <Box>
                <h1>Therapy</h1>
                <img
          src="http://localhost:5001/video-feed"
          alt="Video Stream"
          style={{
            width: "50%",
            height: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
            </Box>
        </Container>
    );
}

export default Page;
