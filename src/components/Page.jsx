import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import ButtonBase from "@material-ui/core/ButtonBase";

import Link from "next/link";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        <LastPageIcon />
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  buttonBase: {
    width: "100%",
    padding: "16px",
    justifyContent: "flex-start",
  },
  tableCell: {
    width: "100%",
    cursor: "pointer",
    padding: 0,
    transition: "all 0.3s",
    "&:hover": {
      background: "#e5e5e5",
    },
  },
});

export default function CustomPaginationActionsTable({ posts }) {
  const router = useRouter();
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    let id = router.components["/post/[postId]"]?.props.pageProps.post.id;
    let page = Math.floor((id - 1) / rowsPerPage);
    setPage(page);
  }, []);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, posts.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : posts
          ).map((post) => (
            <TableRow key={post.id}>
              <Link href="/post/[postId]" as={`/post/${post.id}`}>
                <TableCell
                  className={classes.tableCell}
                  component="th"
                  scope="row"
                >
                  {" "}
                  <ButtonBase className={classes.buttonBase}>
                    <a onClick={() => setPage(page)}>
                      <span>
                        <strong>{post.id}.&ensp;</strong>
                      </span>
                      {post.title}
                    </a>
                  </ButtonBase>
                </TableCell>
              </Link>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={posts.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
      <style jsx>
        {`
          li {
            list-style: none;
            margin-bottom: 1em;
          }
          a {
            text-decoration: none;
            color: black;
          }
        `}
      </style>
    </TableContainer>
  );
}

// export async function getStaticProps() {
//   let res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   let posts = await res.json();

//   return { props: { posts } };
// }
