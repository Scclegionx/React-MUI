import { alpha, Theme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import { styled } from '@mui/system';

const Logotype = styled('div')(({ theme }: { theme: Theme }) => ({
  color: "white",
  marginLeft: theme.spacing(2.5),
  marginRight: theme.spacing(2.5),
  fontWeight: 500,
  fontSize: 18,
  whiteSpace: "nowrap",
  [theme.breakpoints.down("xs")]: {
    display: "none",
  },
}));

const AppBar = styled('div')(({ theme }: { theme: Theme }) => ({
  width: "100vw",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const Toolbar = styled('div')(({ theme }: { theme: Theme }) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const Hide = styled('div')({
  display: "none",
});

const Grow = styled('div')({
  flexGrow: 1,
});

const Search = styled('div')(({ theme }: { theme: Theme }) => ({
  position: "relative",
  borderRadius: 25,
  paddingLeft: theme.spacing(2.5),
  width: 36,
  backgroundColor: alpha(theme.palette.common.black, 0),
  transition: theme.transitions.create(["background-color", "width"]),
  "&:hover": {
    cursor: "pointer",
    backgroundColor: alpha(theme.palette.common.black, 0.08),
  },
}));

const SearchFocused = styled(Search)(({ theme }: { theme: Theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: 250,
  },
}));

const SearchIcon = styled('div')(({ theme }: { theme: Theme }) => ({
  width: 36,
  right: 0,
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: theme.transitions.create("right"),
  "&:hover": {
    cursor: "pointer",
  },
}));

const SearchIconOpened = styled(SearchIcon)(({ theme }: { theme: Theme }) => ({
  right: theme.spacing(1.25),
}));

const InputRoot = styled('div')({
  color: "inherit",
  width: "100%",
});

const InputInput = styled('input')(({ theme }: { theme: Theme }) => ({
  height: 36,
  padding: 0,
  paddingRight: 36 + theme.spacing(1.25),
  width: "100%",
}));

const MessageContent = styled('div')({
  display: "flex",
  flexDirection: "column",
});

const HeaderMenu = styled('div')(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(7),
}));

const HeaderMenuList = styled('div')({
  display: "flex",
  flexDirection: "column",
});

const HeaderMenuItem = styled('div')(({ theme }: { theme: Theme }) => ({
  "&:hover, &:focus": {
    backgroundColor: light,
  },
}));

const HeaderMenuButton = styled('button')(({ theme }: { theme: Theme }) => ({
  marginLeft: theme.spacing(2),
  padding: theme.spacing(0.5),
}));

const HeaderMenuButtonSandwich = styled('button')(({ theme }: { theme: Theme }) => ({
  marginLeft: 9,
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const HeaderMenuButtonCollapse = styled('button')(({ theme }: { theme: Theme }) => ({
  marginRight: theme.spacing(2),
}));

const HeaderIcon = styled('div')({
  fontSize: 28,
  color: "rgba(255, 255, 255, 0.35)",
});

const HeaderIconCollapse = styled(HeaderIcon)({
  color: "white",
});

const ProfileMenu = styled('div')({
  minWidth: 265,
});

const ProfileMenuUser = styled('div')(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
}));

const ProfileMenuItem = styled('div')(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.primary,
}));

const ProfileMenuIcon = styled('div')(({ theme }: { theme: Theme }) => ({
  marginRight: theme.spacing(2),
  color: theme.palette.text.primary,
  '&:hover': {
    color: theme.palette.primary.main,
  }
}));

const ProfileMenuLink = styled('a')({
  fontSize: 16,
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
  },
});

const MessageNotification = styled('div')(({ theme }: { theme: Theme }) => ({
  height: "auto",
  display: "flex",
  alignItems: "center",
  "&:hover, &:focus": {
    backgroundColor: theme.palette.info.light,
  },
}));

const MessageNotificationSide = styled('div')(({ theme }: { theme: Theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginRight: theme.spacing(2),
}));

const MessageNotificationBodySide = styled(MessageNotificationSide)({
  alignItems: "flex-start",
  marginRight: 0,
});

const SendMessageButton = styled('button')(({ theme }: { theme: Theme }) => ({
  margin: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textTransform: "none",
}));

const SendButtonIcon = styled('span')(({ theme }: { theme: Theme }) => ({
  marginLeft: theme.spacing(2),
}));

const PurchaseBtn = styled('button')(({ theme }: { theme: Theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  marginRight: theme.spacing(3)
}));

const styles = {
  logotype: Logotype,
  appBar: AppBar,
  toolbar: Toolbar,
  hide: Hide,
  grow: Grow,
  search: Search,
  searchFocused: SearchFocused,
  searchIcon: SearchIcon,
  searchIconOpened: SearchIconOpened,
  inputRoot: InputRoot,
  inputInput: InputInput,
  messageContent: MessageContent,
  headerMenu: HeaderMenu,
  headerMenuList: HeaderMenuList,
  headerMenuItem: HeaderMenuItem,
  headerMenuButton: HeaderMenuButton,
  headerMenuButtonSandwich: HeaderMenuButtonSandwich,
  headerMenuButtonCollapse: HeaderMenuButtonCollapse,
  headerIcon: HeaderIcon,
  headerIconCollapse: HeaderIconCollapse,
  profileMenu: ProfileMenu,
  profileMenuUser: ProfileMenuUser,
  profileMenuItem: ProfileMenuItem,
  profileMenuIcon: ProfileMenuIcon,
  profileMenuLink: ProfileMenuLink,
  messageNotification: MessageNotification,
  messageNotificationSide: MessageNotificationSide,
  messageNotificationBodySide: MessageNotificationBodySide,
  sendMessageButton: SendMessageButton,
  sendButtonIcon: SendButtonIcon,
  purchaseBtn: PurchaseBtn
};

export default styles;

