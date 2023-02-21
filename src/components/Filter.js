import React from "react";
import {
  Slider,
  Typography,
  // OutlinedInput,
  // InputLabel,
  // MenuItem,
  // FormControl,
  // Select,
  // Chip,
  Box,
  // Rating,
  Stack,
  TextField,
} from "@mui/material";
// import { useTheme } from "@mui/material/styles";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name, categoryName, theme) {
//   return {
//     fontWeight:
//       categoryName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const Filter = ({
  setQuery,
  maxPrice,
  setFilterPrice,
  filterPrice,
  category,
  filterCategory,
  setFilterCategory,
}) => {
  // const names = category.map((item) => item.categoryName);

  // const theme = useTheme();
  // const [value, setValue] = React.useState(2);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setFilterCategory(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  return (
    <Box
      sx={{
        diplay: "flex",
        flexDirection: "column",
        mt: 2,
        pt: 4,
        pr: 4,
        ml: -1,
      }}
    >
      <Stack>
        <Typography variant="h6" sx={{ mb: 1, pt: 2 }}>
          SEARCH
        </Typography>
        <TextField
          size="small"
          sx={{
            backgroundColor: "white",
            border: 0,
            mr: 2,
          }}
          id="search"
          variant="outlined"
          onChange={(e) => setQuery(e.target.value.toLowerCase())}
        />
      </Stack>
      <Typography variant="h6" sx={{ mb: 1, pt: 2 }}>
        FILTER
      </Typography>
      <Stack sx={{ pt: 2 }}>
        <Typography>Price</Typography>
        <Slider
          step={100}
          max={Number(maxPrice)}
          default={Number(filterPrice)}
          valueLabelDisplay="auto"
          sx={{ color: "#282C34" }}
          value={filterPrice}
          onChange={(e) => setFilterPrice(Number(e.target.value))}
        />
      </Stack>

      {/* <Stack sx={{ pt: 4 }}>
        <FormControl>
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category"
            multiple
            value={filterCategory}
            onChange={handleChange}
            input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, category, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack> */}
      {/* <Stack sx={{ pt: 4 }}>
        <Typography component="legend">Rating</Typography>
        <Rating
          sx={{ pt: 1 }}
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Stack> */}
    </Box>
  );
};

export default Filter;
