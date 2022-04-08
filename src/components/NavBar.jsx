import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import useGameContext from './useGameContext';

import '../styles/NavBar.css'

export default function NavBar() {
    const { difficulty } = useGameContext();

    return (
        <AppBar position="static" style={{ backgroundColor: "black", width: "100%", margin: "0" }}>
                <Toolbar disableGutters style={{ marginLeft: "20px" }}>
                    <Typography variant="h6" noWrap component="div" fontFamily="Impact" mr={2} fontSize={22}>
                        Wordle Clone
                    </Typography>
                    <Divider orientation="vertical" flexItem color="white" variant="middle" />
                    <Tooltip title="Home" placement="bottom-end">
                        <IconButton>
                            <Link to="/">
                                <HomeIcon className="icon" />
                            </Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Help" placement="bottom-end">
                        <IconButton>
                            <Link to="/rules">
                                <HelpIcon className="icon" />
                            </Link>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Play" placement="bottom-end">
                        <IconButton>
                            <Link to={"/game?difficulty=" + difficulty}>
                                <SportsEsportsIcon className="icon" />
                            </Link>
                        </IconButton>
                    </Tooltip>
                </Toolbar>
        </AppBar>
    );
}