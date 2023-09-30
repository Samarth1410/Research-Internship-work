import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
  Container,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import GearIcon from "../../misc/icons/RCTS - Logo - Transparent 1.png";
import UserIcon from "../../misc/icons/User.png";
import RegisterIcon from "../../misc/icons/Admin_forms.png";
import DateIcon from "../../misc/icons/Date_range.png";
import GradesIcon from "../../misc/icons/Grades.png";
import BookIcon from "../../misc/icons/Book.png";

const drawerWidth = 260;

const TeacherNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerItems = [
    { text: "User Profile", to: "/teacher/userprofile" , src : UserIcon , style : {width : "100%"}},
    { text: "Grades", to: "/teacher/gradescenter"  , src : GradesIcon , style : {width : "80%" , paddingLeft : "10px"}},
    { text: "Syllabus Portal", to: "/teacher/syllabus" , src : BookIcon , style : {width : "80%" , paddingLeft : "10px"}},
    { text: "Attendance Portal", to: "/teacher/attendance" , src : DateIcon , style : {width : "80%" , paddingLeft : "10px"}},,
  ];

  return (
    <div>
      <AppBar position="static" sx={{backgroundColor : "#d9d9d9"}}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="primary" component={RouterLink} to="/">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#4e4e4e",
          },
        }}
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        <List>
          <ListItem>
            <img
              src={GearIcon}
              style={{ width : "100%" , height : "50%"}}
            />
          </ListItem>
          {drawerItems.map((item) => (
            <>
            <Box sx={{height : "20%"}}>
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.to}
              onClick={handleDrawerToggle}
              >
                <Box sx={{width : "30%" , height : "10%"}}>

            <img src={item.src} style={item.style} />
                </Box>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ color: "white" }}
                />
            </ListItem>
          </Box>
          </>
          ))}
        </List>
      </Drawer>
      <Container sx={{ paddingLeft: drawerWidth }}>
        {/* your page content goes here */}
      </Container>
    </div>
  );
};

export default TeacherNavbar;
