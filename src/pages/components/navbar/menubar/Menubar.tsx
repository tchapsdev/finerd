import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Box, Container, IconButton, ImageList, ImageListItem, Toolbar } from '@mui/material';

export const Menubar = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar
            position="static"
            color="inherit"
            elevation={0}
            sx={{ boxShadow: 'none' }}
        >
            <Container maxWidth={false}>
                <Toolbar variant="dense">
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                        <IconButton edge="start" color="inherit">
                            <ImageList sx={{ minWidth: '70px', width: '70px' }} cols={1}>
                                <ImageListItem>
                                    <img
                                        src={'/images/logo-cropped.svg'}
                                        alt="logo"
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            </ImageList>
                        </IconButton>
                    </Box>
                    <IconButton edge="end" color="inherit" sx={{ p: 0 }}>
                        <MoreIcon/>
                        {/* todo: add handler to open menu with sign up or log out options */}
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    </Box>
);

