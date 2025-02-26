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
import { TextField } from "@mui/material";
import { editFood } from "../../../actions/food.action";

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
  const [newFood, setNewFood] = useState({ name: "", allergens: {} });
  const foodReducer = useSelector((state) => state.foodReducer);
  const [foodsData, setFoodsData] = useState([]);
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

  const handleNewCellClick = (allergenKey) => {
    const currentLevel = newFood.allergens[allergenKey] || "non";
    setNewFood((prev) => ({
      ...prev,
      allergens: {
        ...prev.allergens,
        [allergenKey]: NEXT_STATE[currentLevel],
      },
    }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom</TableCell>
            {allergenData.map((allergen, index) => (
              <TableCell key={index} align="center">
                {allergen.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {foodsData.map((food, foodIndex) => (
            <TableRow key={food.name}>
              <TableCell component="th" scope="row">
                {food.name}
              </TableCell>
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
                  >
                    {allergen.level}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}

          {/* Ligne pour ajouter un nouvel aliment */}
          <TableRow>
            <TableCell component="th" scope="row">
              <TextField
                variant="outlined"
                size="small"
                placeholder="Nom"
                value={newFood.name}
                onChange={(e) =>
                  setNewFood({ ...newFood, name: e.target.value })
                }
              />
            </TableCell>
            {allergenData.map((allergen, index) => {
              const allergenKey = allergen.name;
              const allergenLevel = newFood.allergens[allergenKey] || "non";
              return (
                <TableCell
                  key={index}
                  align="center"
                  onClick={() => handleNewCellClick(allergenKey)}
                  sx={{
                    backgroundColor: COLOR_MAP[allergenLevel],
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {allergenLevel}
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllergensTable;
