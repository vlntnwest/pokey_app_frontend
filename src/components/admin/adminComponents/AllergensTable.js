import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  Box,
  Checkbox,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { addFood, deleteFood, editFood } from "../../../actions/food.action";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const COLOR_MAP = {
  non: "",
  trace: "#2196F3", // Bleu
  oui: "#F44336", // Rouge
};

const NEXT_STATE = {
  non: "trace",
  trace: "oui",
  oui: "non",
};

const AllergensTable = () => {
  const [allergenData, setAllergenData] = useState([]);
  const [newFood, setNewFood] = useState("");
  const foodReducer = useSelector((state) => state.foodReducer);
  const [foodsData, setFoodsData] = useState([]);
  const [toTrash, setToTrash] = useState([]);
  const rowCount = foodReducer.length;
  const numSelected = toTrash.length;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_API_URL}api/allergen`)
        .then((res) => setAllergenData(res.data))
        .catch((error) => console.log(error));

      setFoodsData(foodReducer);
    };
    fetchData();
  }, [foodReducer]);

  const handleCellClick = async (foodIndex, allergen, food) => {
    const updatedFoods = [...foodsData];

    const updatedAllergens = updatedFoods[foodIndex].allergens.map(
      (currentAllergen) => {
        if (currentAllergen.allergen_id === allergen.allergen_id) {
          return {
            ...currentAllergen,
            level: NEXT_STATE[currentAllergen.level],
          };
        }
        return currentAllergen;
      }
    );

    updatedFoods[foodIndex] = {
      ...updatedFoods[foodIndex],
      allergens: updatedAllergens,
    };

    const data = {
      allergen_id: allergen._id,
      level: NEXT_STATE[allergen.level],
    };

    await dispatch(editFood(food._id, data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      dispatch(addFood(newFood));
    } catch (error) {
      console.error("Erreur lors de la suppression des aliments :", error);
    }

    setNewFood("");
  };

  const moveToTrash = (e, food) => {
    setToTrash((prevTrash) =>
      e.target.checked
        ? [...prevTrash, food._id]
        : prevTrash.filter((id) => id !== food._id)
    );
  };

  const selectAll = (e) => {
    if (e.target.checked) {
      setToTrash(foodsData.map((food) => food._id));
    } else {
      setToTrash([]);
    }
  };

  const emptyTrash = async (e) => {
    try {
      await dispatch(deleteFood(toTrash));
      setToTrash([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des aliments :", error);
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Toolbar>
          {numSelected > 0 ? (
            <Typography
              sx={{ flex: "1 1 100%" }}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected > 1
                ? `${numSelected} sélectionnés`
                : `${numSelected} sélectionné`}
            </Typography>
          ) : (
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Allergènes
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton onClick={emptyTrash}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={selectAll}
                  inputProps={{
                    "aria-label": "select all foods",
                  }}
                />
              </TableCell>
              <TableCell>
                {" "}
                <Typography variant="body1" component="p">
                  Aliments
                </Typography>
              </TableCell>
              {allergenData.map((allergen, index) => (
                <TableCell key={index} align="center">
                  <Typography
                    variant="body1"
                    component="p"
                    sx={{ fontWeight: 400 }}
                  >
                    {allergen.name}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {foodsData.map((food, foodIndex) => (
              <TableRow key={food.name}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    onChange={(e) => moveToTrash(e, food)}
                    checked={toTrash.includes(food._id)}
                  />
                </TableCell>
                <TableCell scope="row">{food.name}</TableCell>
                {food.allergens.map((allergen, index) => {
                  const allergenLevel = allergen.level || "oui";
                  return (
                    <TableCell
                      key={index}
                      align="center"
                      onClick={() => handleCellClick(foodIndex, allergen, food)}
                      sx={{
                        backgroundColor: COLOR_MAP[allergenLevel],
                        cursor: "pointer",
                        transition: "background 0.3s",
                      }}
                    ></TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Toolbar>
          <Box component="form" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              sx={{ minWidth: 150 }}
              variant="outlined"
              size="small"
              placeholder="Nom"
              value={newFood}
              onChange={(e) => setNewFood(e.target.value)}
            />
          </Box>
        </Toolbar>
      </TableContainer>
    </div>
  );
};

export default AllergensTable;
