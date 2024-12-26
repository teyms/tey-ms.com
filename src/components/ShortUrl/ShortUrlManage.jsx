import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  NavLink,
  json,
  redirect,
  useLocation,
} from "react-router-dom";
import Swal from "sweetalert2";

import "./shortUrlManage.css";
import { helperErrorPopUp } from "../../utils/validation";

import { createShortUrl, getShortUrlList, deleteShortUrl } from "../../store/shortUrl-action";
import { shortUrlActions } from "../../store/shortUrl-slide";
import Loading from "../../components/Loader/Loading";
import { GUEST_SUBMIT_FORM, USER_SUBMIT_FORM } from "../../utils/constant";
import {
  validateUrl,
  validateCustomPath,
  validateTitle,
  validateDescription,
  validateExpiresAt,
} from "./ShortUrlCreateUtils";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import ShortUrlEditDialog from "./ShortUrlEditDialog";

function ShortUrlManage({ method, event }) {
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of DateTimePicker
  const [enteredValues, setEnteredValues] = useState({
    original_url: "",
    customPath: "",
    title: "",
    description: "",
    expires_at: null, // Initialize to null (or new Date()) to avoid the uncontrolled warning
  });

  const { isAuthenticated, user } = useSelector((state) => state.googleAuth);
  const shortUrlList = useSelector((state) => state.shortUrl.manage.data);
  const status = useSelector((state) => state.shortUrl.data.success);
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  // const getShortUrlString = useParams();

  const location = useLocation();
  // Create a URLSearchParams object from the query string
  const queryParams = new URLSearchParams(location.search);
  // Get the value of the 'page' query parameter
  const page = queryParams.get("page");

  // useEffect(() => {
  //   console.log('shortUrlList updated', shortUrlList);
  // }, [shortUrlList]);

  useEffect(() => {
    async function getFullUrlList() {
      await dispatch(getShortUrlList(page));
    }

    try {
      getFullUrlList();
    } catch {
      Swal.fire({
        title: "ERROR!",
        text: "Something Went Wrong!",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "custom-swal-color",
          content: "custom-swal-color",
          confirmButton: "custom-swal-color",
        },
      }).then((result) => {
        // if (result.isConfirmed) {
        // } else {
        // }
      });
    }
  }, []);

  return (
    <>
      {isLoading && <Loading />}

      {isAuthenticated && <div className='shortUrl-nav-container'>        
        <div className='shortUrl-nav-btn'>
            <NavLink className="shortUrl-nav-navlink"  to="/shorturl/manage"> Manage </NavLink>
            <NavLink className="shortUrl-nav-navlink"  to="/shorturl"> Create </NavLink>
        </div>
      </div>}      

      <div className="shortUrlManage-parent-container">
        <div className="shortUrlManage-container">
          <h1 className="shortUrlManage-title">Short URL</h1>

          { (shortUrlList !== undefined && shortUrlList.length > 0)
            ? 
            <TableContainer component={Paper}>
            <Table
              sx={{
                minWidth: 650,
                color: "#ede5e5",
                backgroundColor: "#5A3785",
              }}
              aria-label="URL list table"
            >
              <TableHead className="shortUrl-manage-mui-th">
                <TableRow className="shortUrl-manage-mui-tr">
                  <TableCell sx={{ color: "#ede5e5" }}>Short URL</TableCell>
                  <TableCell sx={{ color: "#ede5e5" }}>Original URL</TableCell>
                  <TableCell sx={{ color: "#ede5e5" }}>Title</TableCell>
                  <TableCell sx={{ color: "#ede5e5" }}>Description</TableCell>
                  <TableCell sx={{ color: "#ede5e5" }}>Click Count</TableCell>
                  <TableCell sx={{ color: "#ede5e5" }}>Expires At</TableCell>
                  <TableCell sx={{ color: "#ede5e5" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="shortUrl-manage-mui-tb">
                {shortUrlList?.map((item) => (
                  <TableRow
                    className="shortUrl-manage-mui-tr"
                    key={item.url}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      color: "#ede5e5",
                    }}
                  >                   
                    <TableCell
                      // component="th"
                      scope="row"
                      sx={{ color: "#ede5e5" }}
                    >{`/shorturl/${item.short_url_path}/${item.url}`}</TableCell>
                    <TableCell sx={{ color: "#ede5e5" }}>{item.original_url}</TableCell>
                    <TableCell sx={{ color: "#ede5e5" }}>{item.title}</TableCell>
                    <TableCell sx={{ color: "#ede5e5" }}>{item.description}</TableCell>
                    <TableCell sx={{ color: "#ede5e5" }}>{item.click_count}</TableCell>
                    <TableCell sx={{ color: "#ede5e5" }}>{item.expires_at}</TableCell>
                    <TableCell>
                      <ShortUrlEditDialog shortUrlEdit={item}/>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item.id)}
                        aria-label="delete"
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </TableContainer>
            :
            <p>No Records found!</p>
          }
        </div>
      </div>
    </>
  );
}

export default ShortUrlManage;
