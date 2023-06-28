import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Autocomplete,
  TextField,
  useColorScheme,
  Popover
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Help,
  Menu,
  Close
} from "@mui/icons-material";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Notifications from "../../components/Notifications";
import HiveIcon from '@mui/icons-material/Hive';
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { setUsers } from "../../state";
import useAuth from "../../hooks/useAuth";
import UserImage from "../../components/UserImage";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const token = useSelector((state) => state.token);

  // Notifications
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const notificationOpen = Boolean(notificationAnchorEl);
  const [hover, setHover] = useState(false);
  const { _id } = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const openNotif = Boolean(anchorEl);

  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { role } = useAuth();
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const { palette } = useTheme();
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const fullName = `Mon Compte`;

  const handleOptionSelected = (event, value) => {
    console.log(value)
    navigate(`/profile/${value._id}`)
    navigate(0)
  };

  const handleNotificationClose = (e) => {
    setNotificationAnchorEl(null);
    setHover(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifClose = () => {
    setAnchorEl(null);
  };

  const getUsers = async () => {
    const response = await fetch(`http://${process.env.REACT_APP_API_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data }));
  };

  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FlexBetween sx={{ position: "fixed", top: "0", left: "0", right: "0", zIndex: "1" }} padding="0.75rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1rem">
        <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center' }}>
          <img
            style={{
              objectFit: "cover", borderRadius: "50%", width: "40px", cursor: "pointer",
            }}
            alt="logo"
            src={`http://${process.env.REACT_APP_API_URL}/assets/beelinked_logo.svg`}
          />
        </Box>
        <Box>
          <Typography
            marginRight={"5px"}
            marginTop={"9px"}
            fontWeight="bold"
            fontSize="clamp(0.75rem, 1.75rem, 2rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            BeeLinked
          </Typography>
          <Typography
            textAlign={"end"}
            marginRight={"5px"}
            marginTop={"-9px"}
            fontWeight="bold"
            fontSize="clamp(0.50rem, 0.7rem, 1.25rem)"
            onClick={() => navigate("/home")}
            sx={{
              background: "linear-gradient(90deg, #eaeaea 0%, #d6d5d5 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            Social
          </Typography>
        </Box>
        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="1rem"
            padding="0.1rem 1.5rem"
          >
            <Stack spacing={2} sx={{ width: 250 }}>
              <Autocomplete
                id="Search"
                freeSolo
                options={users}
                getOptionLabel={(option) => (
                  <FlexBetween>
                    <FlexBetween gap="1rem">
                      <UserImage image={option.picturePath} size="45px" />
                      <Box>
                        <Typography
                          color={main}
                          variant="h6"
                          fontWeight="500"
                          sx={{
                            "&:hover": {
                              color: palette.primary.light,
                              cursor: "pointer",
                            },
                          }}
                        >
                          {option.firstName + " " + option.lastName}
                        </Typography>
                        <Typography color={medium} fontSize="0.60rem">{option.location}</Typography>
                      </Box>
                    </FlexBetween>
                  </FlexBetween>
                )}
                onChange={handleOptionSelected}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{ ...params.InputProps, disableUnderline: true }}
                    variant="standard"
                    label="Cliquez pour rechercher un utilisateur"
                    InputLabelProps={{ position: 'absolute !important', top: '-6px !important' }}

                  />
                )} />
            </Stack>
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {role == "apiculteur" ?
            (<IconButton sx={{ backgroundColor: "#ffc107" }} onClick={() => navigate("/apiaries")}>
              <HiveIcon sx={{ color: "white" }} />
            </IconButton>)
            : role == "invite"}
          <IconButton aria-describedby={_id} onClick={handleClick}>
            <NotificationsIcon sx={{color:'black'}} />
          </IconButton>
          <Popover
            open={notificationOpen}
            anchorEl={notificationAnchorEl}
            onClose={handleNotificationClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <Notifications />
          </Popover>
          <Popover
            id={_id}
            open={openNotif}
            anchorEl={anchorEl}
            onClose={handleNotifClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Notifications />
          </Popover>
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => navigate(`/settings/${user._id}`)}>Paramètres</MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Déconnexion</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <Autocomplete
              id="Search"
              freeSolo
              options={users.map((user) => `${user.firstName} ${user.lastName}`)}
              renderInput={(params) => <TextField {...params} label="Chercher un utilisateur" />}
            />
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            {role == "apiculteur" ?
              (<IconButton sx={{ backgroundColor: "#ffc107" }}>
                <HiveIcon sx={{ color: "white" }} onClick={() => navigate("/apiaries")} />
              </IconButton>)
              : role == "invite"}
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Déconnexion
                </MenuItem>
                <MenuItem onClick={() => navigate(`/settings/${user._id}`)}>
                  Paramètres
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;

