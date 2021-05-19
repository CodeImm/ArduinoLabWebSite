import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

function Loading() {
    return (
        <Container maxWidth="xs" >
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center" >
                <CircularProgress/>
            </Box>
        </Container>
    );
}

export default Loading;