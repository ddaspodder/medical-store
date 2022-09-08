import { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/custom/Table";
import TextField from "./components/core/TextField";
import Modal from "./components/core/Modal";
import AddProductForm from "./components/custom/AddProductForm";
import { PaddedWrapper } from "./components/core/StyledComponents";
import {
  getUnitList,
  getSubUnitList,
  getTypeList,
  getTableData,
  getTableDataSorted,
} from "./apiEndpoint";
import Alert from "./components/core/Alert";
import MedicationIcon from "@mui/icons-material/Medication";
import {
  SectionWrapper,
  SectionOneByTwo,
  InputWrapperSearch,
  InputWrapper,
  SectionCustom,
  Header,
  Footer,
} from "./components/core/StyledComponents";
import SampleForm from "./components/custom/SampleForm";
import Select from "./components/core/Select";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import IconButton from "@mui/material/IconButton";

export const columns = [
  { id: "type", label: "Type" },
  {
    id: "product",
    label: "Product Name",
    minWidth: 120,
    align: "left",
  },
  {
    id: "stock",
    label: "Stock",
    align: "left",
  },
  {
    id: "store",
    label: "Store",
    align: "left",
  },
  {
    id: "shop",
    label: "Shop",
    align: "left",
  },
  {
    id: "rack",
    label: "Rack No.",
    minWidth: 70,
    align: "left",
  },
  {
    id: "manufacturer",
    label: "Manufacturer",
    minWidth: 120,
    align: "left",
  },
  {
    id: "supplier",
    label: "Supplier",
    minWidth: 120,
    align: "left",
  },
];

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const [subUnitList, setSubUnitList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [searchText, setSeatchText] = useState("");
  const [sortByValue, setSortByValue] = useState("");
  const [sortByOrder, setSortByOrder] = useState("asc");
  const [filter, setFilter] = useState("none");

  const handleFilter = (value) => {
    setFilter(value);
    handleFilterAndSearch(value, searchText);
  };

  const onChangeSearch = (value) => {
    setSeatchText(value);
    handleFilterAndSearch(filter, value);
  };

  const handleFilterAndSearch = (filter, searchText, dataP = data) => {
    const filteredData = dataP.filter((product) => {
      if (searchText === "") return true;
      return product.product.toLowerCase().includes(searchText.toLowerCase());
    });

    const fData = filteredData.filter(({ stock, limit, shop }) => {
      const stockN = Number(stock.split("|")[0]);
      const shopN = Number(shop.split("|")[0]);
      const limitN = Number(limit);
      switch (filter) {
        case "none":
          return true;

        case "order":
          return stockN < limitN;

        case "bring":
          return stockN >= limitN && shopN < limitN;
      }
    });

    setFilteredData(fData);
  };

  const handleChangeSort = async (value) => {
    try {
      let sortedData = await getTableDataSorted(value, sortByOrder);
      setData(sortedData.data);
      setFilteredData(sortedData.data);
      setSortByValue(value);
      searchText && onChangeSearch(searchText);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeSortOrder = async () => {
    try {
      let currentSortByOrder = sortByOrder === "asc" ? "desc" : "asc";
      let sortedData = await getTableDataSorted(
        sortByValue,
        currentSortByOrder
      );
      setData(sortedData.data);
      setFilteredData(sortedData.data);
      setSortByOrder(currentSortByOrder);
      searchText && onChangeSearch(searchText);
    } catch (e) {
      console.log(e);
    }
  };

  const handleAlert = (message, severity, open) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpenAlert(open);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const fetchData = async () => {
    try {
      let apiData = await getTableData();
      let sortedData = apiData.data;
      // sortedData.sort((a, b) =>
      //   a.product.toLowerCase().localeCompare(b.product.toLowerCase())
      // );
      setData(sortedData);
      // setFilteredData(sortedData);
      handleFilterAndSearch(filter, searchText, sortedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let apiData = await getUnitList();
        setUnitList(apiData.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let apiData = await getSubUnitList();
        setSubUnitList(apiData.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        let apiData = await getTypeList();
        setTypeList(apiData.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const sortByList = columns
    .filter(({ id }) => id !== "stock" && id !== "store" && id !== "shop")
    .map(({ id, label }) => ({
      id: id,
      value: label,
    }));

  const filterList = [
    { id: "none", value: "None" },
    { id: "order", value: "To Order" },
    { id: "bring", value: "To Bring" },
  ];

  return (
    <div className="App">
      <Alert
        severity={alertSeverity}
        message={alertMessage}
        open={openAlert}
        handleCloseAlert={handleCloseAlert}
      />
      <Header>
        <div>
          <h1>Rama Medicine Store</h1>
        </div>
        <div>
          <MedicationIcon sx={{ fontSize: 50 }} />
        </div>
      </Header>
      <PaddedWrapper
        padding={"0px 50px 0px 50px"}
        paddingMob={"0px 20px 0px 20px"}
      >
        <h4 style={{ color: "#1976d2" }}>Dr. Debpritam Saha</h4>
      </PaddedWrapper>
      <PaddedWrapper
        padding={"20px 50px 20px 50px"}
        paddingMob={"20px 20px 20px 20px"}
      >
        <SectionWrapper position="center">
          <SectionOneByTwo>
            <Modal label={"+ Add Product"}>
              {(props) => (
                <AddProductForm
                  {...props}
                  unitList={unitList}
                  subUnitList={subUnitList}
                  typeList={typeList}
                  handleAlert={handleAlert}
                  fetchData={fetchData}
                />
              )}
            </Modal>
          </SectionOneByTwo>
          <SectionOneByTwo>
            <SectionWrapper align="right">
              <SectionCustom width={"400px"}>
                <InputWrapperSearch>
                  <TextField
                    id="outlined-search"
                    label="Search Product"
                    type="search"
                    value={searchText}
                    onChange={onChangeSearch}
                  />
                </InputWrapperSearch>
              </SectionCustom>
            </SectionWrapper>
            <SectionWrapper align="right">
              <SectionCustom>
                <PaddedWrapper
                  padding={"20px 0px 0px 0px"}
                  paddingMob={"20px 0px 0px 0px"}
                >
                  <SectionWrapper>
                    <SectionCustom width={"356px"}>
                      <InputWrapperSearch>
                        <Select
                          label={"Sort By"}
                          value={sortByValue}
                          onChange={handleChangeSort}
                          list={sortByList}
                        />
                      </InputWrapperSearch>
                    </SectionCustom>
                    <PaddedWrapper
                      padding={"10px 0px 10px 10px"}
                      paddingMob={"10px 0px 10px 10px"}
                    >
                      <IconButton
                        aria-label="sort_order"
                        size="small"
                        onClick={handleChangeSortOrder}
                      >
                        {sortByOrder === "asc" ? (
                          <ArrowUpwardIcon />
                        ) : (
                          <ArrowDownwardIcon />
                        )}
                      </IconButton>
                    </PaddedWrapper>
                  </SectionWrapper>
                </PaddedWrapper>
              </SectionCustom>
            </SectionWrapper>
            <SectionWrapper align="right">
              <SectionCustom>
                <PaddedWrapper
                  padding={"20px 0px 50px 0px"}
                  paddingMob={"20px 0px 0px 0px"}
                >
                  <SectionWrapper>
                    <SectionCustom width={"400px"}>
                      <InputWrapperSearch>
                        <Select
                          label={"Filter By"}
                          value={filter}
                          onChange={handleFilter}
                          list={filterList}
                        />
                      </InputWrapperSearch>
                    </SectionCustom>
                  </SectionWrapper>
                </PaddedWrapper>
              </SectionCustom>
            </SectionWrapper>
          </SectionOneByTwo>
        </SectionWrapper>
      </PaddedWrapper>
      <PaddedWrapper
        padding={"20px 50px 50px 50px"}
        paddingMob={"20px 20px 50px 20px"}
      >
        <Table
          columns={columns}
          data={filteredData}
          fetchData={fetchData}
          unitList={unitList}
          subUnitList={subUnitList}
          typeList={typeList}
          handleAlert={handleAlert}
        />
      </PaddedWrapper>
      <Footer>&copy; Debjyoti Das Podder</Footer>
    </div>
  );
}

export default App;
