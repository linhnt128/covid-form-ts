import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Pagination,

} from "react-bootstrap";
import BsTable from "react-bootstrap/Table";
// import constants
import { 
  tableHeader,
  // itemsPerPage,
  
} from "../../utils/constants/table/TableConstants";
// import types
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";
// import reducers
import { renderData } from "../../store/reducers/loadDataSlice";
// import custom hooks
import { useAppDispatch } from "../../store/store";
import { deleteFormData } from "../../store/reducers/loadDataSlice";
import { ITableRow } from "../../utils/types/table/TableTypes";


const Table = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [reloadPage, setReloadPage] = useState<number>(0);

    const [searchText, setSearchText] = useState('');
    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const { rows } = useSelector((state: RootState) => state.loadData);

    const filterList = rows.filter(
        (item) =>
            item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
            item.dateOfBirth.toLowerCase().includes(searchText.toLowerCase()) ||
            item.id.toLowerCase().includes(searchText.toLowerCase()) ||
            item.gender.toLowerCase().includes(searchText.toLowerCase()) ||
            item.object.toLowerCase().includes(searchText.toLowerCase()),
    );

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(2);
    const total = filterList.length;
    const pages = [];
    for (let i = 1; i <= Math.ceil(total / itemPerPage); i++) {
        pages.push(i);
    };
    const lastItem = currentPage * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const currentListForm = filterList.slice(firstItem, lastItem);
  
    const handleAddNewForm = () => {
      navigate("/declaration");
    };

    const handleEditForm = (id: string) => {
      navigate(`/edit/${id}`);
    };

    const handleDelete = (id: string) => {
      // console.log(id);
      const confirmed: boolean = confirm("Do you want to delete form with ID: ${id}");
      confirmed && dispatch(deleteFormData(id));
    };


    return (
      <Container>
        {/* header */}
        <header className="header">
          <Row>
            <Col>
              <h1 className="text-center mt-5">
                Vietnam Health Declaration for foreign entry
              </h1>
            </Col>
          </Row>
        </header>
        {/* Table caption */}
        <section className="table-caption mt-4">
          <Row className="text-center">
            <Col className="d-flex justify-content-start">
              <Form.Control
                type="text"
                id="search"
                placeholder="Search..."
                className="w-75"
                onChange={handleFilterChange}
              />
            </Col>
            <Col className="d-flex justify-content-end">
              <Button className="btn-success" onClick={handleAddNewForm}>
                New form
              </Button>
            </Col>
          </Row>
        </section>
        {/* Table */}
        <main className="table">
          <Row>
            <Col>
              <BsTable className="table-bordered table-hover table-striped mt-4">
                <thead className="bg-success">
                  <tr className="font-weight-bold">
                    {tableHeader.map((element, index) => (
                      <th key={index}>{element}</th>
                    ))}
                  </tr>
                </thead>
                <tbody id="table-body">
                  {currentListForm &&
                    currentListForm.map((row, index) => (
                      <tr key={row.id}>
                        <td>{index + 1}</td>
                        <td>
                          <i
                            className="bi bi-pencil-fill text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleEditForm(row.id)}
                          />
                          <i
                            className="bi bi-trash text-danger"
                            style={{ cursor: "pointer", margin: "0 9px" }}
                            onClick={() => handleDelete(row.id)}
                          />
                          {row.id}
                        </td>
                        <td>{row.fullName}</td>
                        <td>{row.object}</td>
                        <td>{row.dateOfBirth}</td>
                        <td>{row.gender}</td>
                        <td>{row.province}</td>
                      </tr>
                    ))}
                </tbody>
              </BsTable>
            </Col>
          </Row>
          {/* Pagination Section*/}
          <Row className="">
            <Col className="d-flex justify-content-end align-content-end pr-0">
              <Pagination className="">
                <Pagination.Prev
                  onClick={() =>
                    currentPage > 1 && setCurrentPage(currentPage - 1)
                  }
                >
                  Previous
                </Pagination.Prev>
                {pages.map((page, index) => (
                  <Pagination.Item
                    onClick={() => setCurrentPage(page)}
                    key={page}
                    active={index + 1 === currentPage}
                  >
                    {page}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() =>
                    currentPage < total - 2 && setCurrentPage(currentPage + 1)
                  }
                >
                  Next
                </Pagination.Next>
              </Pagination>
            </Col>
            <Col className="pl-0 d-flex justify-content-start align-content-start">
              <Form.Select
                className="mt-2"
                size="sm"
                style={{ height: "50%", width: "15%" }}
                value={itemPerPage}
              >
                <option value="2">2</option>
                <option value="4">4</option>
                <option value="6">6</option>
              </Form.Select>
              <span
                style={{
                  marginLeft: "10px",
                  marginTop: "5px",
                  paddingLeft: "0",
                }}
              >
                Items/Page
              </span>
            </Col>
          </Row>
        </main>
      </Container>
    );
};

export default Table;