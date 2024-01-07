import "./Header.css";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Stack } from "@mui/material";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const settings = ["Profile", "Account", "Dashboard", "Logout"];



function Header({isToken,setToken}) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  

  const [isLoggedIn , setIsLoggedIn] = React.useState<boolean>(false)


  const handleLogout= ()=>{

    localStorage.removeItem("token")
    setToken("")

    navigate("/product");

    handleCloseUserMenu()

  }

  

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {

    console.log("effect called")
    

    console.log("token in header is ", isToken)

    if (!isToken) {
      console.log("empty")
      setIsLoggedIn(false)
      return
}
let payload
let expDate 
let currentDate 
let currentTimestamp
let expTimestamp

if (isToken){
  
   payload = JSON.parse(atob(isToken.split(".")[1])) 
   expDate = new Date(payload.exp * 1000);
   currentDate = new Date();
   currentTimestamp = currentDate.toUTCString();
   expTimestamp = expDate.toUTCString();
   if (currentTimestamp < expTimestamp) {
    setIsLoggedIn(true)
   }
}
    
  } , [isToken])

  // if (!isToken) return <>xyz</>
  

  return (
    <>

      <div style={{backgroundColor: "#f5f5f5",display:"flex",justifyContent:"space-between"}} >
          <div style={{display:"flex",alignItems:"center" , width:"100%"}}>
            {/* <Link component={RouterLink} to="/"> */}
            <AdbIcon component="a" href="/" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            {/* </Link> */}
            
            <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  my: 2,
                  marginTop:"17px",
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "gray",
                  textDecoration: "none"
                }}
              >
                
                
                <div className="NavLink">LOGO</div>
                <div
                  style={{
                    marginRight: "15px",
                    height: "45px",
                    width: "1px",
                    backgroundColor: "#D3D3D3",
                    marginLeft: "10px",
                    color: "#D3D3D3",
                    marginTop: "2px",
                    marginBottom: "2px"
                  }}
                />
              </Typography>

            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            
            {(isLoggedIn) ? (
              <div style={{width: "100%",display:"flex" , justifyContent:"space-between"}}>
                <div className="NavLink">
                  <div className="NavLinkMob">
                <Stack direction="row" spacing={2}>
                <Button style={{ color: "#949494" }}>Dashboard</Button>
                <Button style={{ color: "#949494" }}>Products</Button>
                <PopupState variant="popover" popupId="demo-popup-menu">
                  {PopupState =>
                    <React.Fragment>
                      <Button
                        style={{ color: "#949494" }}
                        {...bindTrigger(PopupState)}
                      >
                        Categories
                      </Button>
                      <Menu {...bindMenu(PopupState)}>
                        <MenuItem onClick={PopupState.close}>Branded</MenuItem>
                        <MenuItem onClick={PopupState.close}>Pre-Loved</MenuItem>
                        {/* <MenuItem onClick={PopupState.close}>Logout</MenuItem> */}
                      </Menu>
                    </React.Fragment>}
                </PopupState>
                <Button style={{ color: "#949494" }}>Orders</Button>
                </Stack>
                </div>
                </div>
                <div >
            
                <Tooltip title="Open settings">
              <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className="Profile-style">
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </div>
              </IconButton>
                </Tooltip>
                <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
              setting ==="Logout" ?(

                <MenuItem key={setting} onClick={handleLogout}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>

            ) :
              (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
                </div>
              </div>

              
        
      ) : (
        
        <div style={{display:"flex", justifyContent:"end",width:"100%"}}>
        <Stack direction="row" spacing={2}>

        <Link component={RouterLink} to="/login">
        <Button style={{ color: "#949494" }}>LogIn</Button>
        </Link>

        <Link component={RouterLink} to="/sign-up">
          <Button style={{ color: "#949494" }}>SignUp</Button>
          </Link>
        </Stack>
        </div>
 
      )}

            {/* <Stack direction="row" spacing={2}>
            <Button style={{ color: "#949494" }}>Dashboard</Button>
            <Button style={{ color: "#949494" }}>Products</Button>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {PopupState =>
                <React.Fragment>
                  <Button
                    style={{ color: "#949494" }}
                    {...bindTrigger(PopupState)}
                  >
                    Categories
                  </Button>
                  <Menu {...bindMenu(PopupState)}>
                    <MenuItem onClick={PopupState.close}>Profile</MenuItem>
                    <MenuItem onClick={PopupState.close}>My account</MenuItem>
                    <MenuItem onClick={PopupState.close}>Logout</MenuItem>
                  </Menu>
                </React.Fragment>}
            </PopupState>
            <Button style={{ color: "#949494" }}>Orders</Button>
            </Stack> */}
          </div>
          {/* <div>
           
              <Tooltip title="Open settings">
                <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <div className="Profile-style">
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </div>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) =>
                setting ==="Logout" ?(

                  <MenuItem key={setting} onClick={handleLogout}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>

              ) :
                (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
          
          </div> */}
      </div>
    </>
  );
}
export default Header;
