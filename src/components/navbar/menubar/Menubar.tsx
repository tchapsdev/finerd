import MoreIcon from '@mui/icons-material/MoreVert';
import { AppBar, Box, Container, IconButton, ImageList, ImageListItem, Toolbar } from '@mui/material';
import { ReactNode } from 'react';

export const Menubar = ({ children }: { children?: ReactNode }) => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="fixed" color="inherit" elevation={0} sx={{ boxShadow: 'none' }}>
			<Container maxWidth={false}>
				<Toolbar variant="dense" sx={{ pt: 0 }}>
					<Box sx={{ display: { xs: 'flex' }, flexGrow: 1 }}>
						<IconButton edge="start" color="inherit" sx={{ fontSize: 'inherit', pt: 0 }}>
							<ImageList sx={{ minWidth: '70px', width: '70px' }} cols={1}>
								<ImageListItem>
									<img src={'/images/logo-cropped.svg'} alt="logo" loading="lazy" />
								</ImageListItem>
							</ImageList>
						</IconButton>
					</Box>
					<IconButton edge="end" color="inherit" sx={{ p: 0 }}>
						<MoreIcon />
						{/* todo: add handler to open menu with sign up or log out options */}
					</IconButton>
				</Toolbar>
			</Container>
			{<>{children}</>}
		</AppBar>
		<div style={{ paddingTop: `200px`}} />
		

		
	</Box>
);
