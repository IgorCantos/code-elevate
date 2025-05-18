import React, { useEffect, useState } from 'react';
import { TextField, Autocomplete, ListSubheader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getBestSellersBooks, getBooks } from 'src/services/books/books-service';

export default function AsynchronousSearch() {
  const [open, setOpen] = useState(false);
  const [bestSellers, setBestSellers] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const page = 1;
  const maxItemPerSearch = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchBestSellersBooks();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (inputValue.length > 1) {
        setLoading(true);
        try {
          const response = await getBooks(page, maxItemPerSearch, inputValue);
          const results = response.data.map((book) => ({
            ...book,
            group: 'Resultados da busca',
          }));
          setOptions(results);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    const delayToSearchAgain = setTimeout(fetchSearchResults, 400);

    return () => clearTimeout(delayToSearchAgain);
  }, [inputValue]);

  const fetchBestSellersBooks = async () => {
    setLoading(true);
    try {
      const response = await getBestSellersBooks(page, maxItemPerSearch);
      setBestSellers(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (!inputValue) {
      const grouped = bestSellers?.map((book) => ({
        ...book,
        group: '⭐ Top 20 livros',
      }));
      setOptions(grouped);
    }
  };

  const handleClose = () => {
    setValue(null);
    setOpen(false);
  };

  const handleChange = (_event, book) => {
    setValue(null);
    setInputValue('');
    if (book) {
      navigate(`/books/${book._id}`, { state: book });
    }
  };

  return (
    <Autocomplete
      sx={{
        width: 700,
        backgroundColor: 'white',
        borderRadius: 50,
        '& .MuiOutlinedInput-root': {
          height: 45,
          borderRadius: 50,
          paddingRight: '8px',
        },
      }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      onChange={handleChange}
      value={value}
      inputValue={inputValue}
      onInputChange={(_event, newInputValue) => {
        setInputValue(newInputValue);
        if (newInputValue === '') {
          setOptions([]);
        }
      }}
      isOptionEqualToValue={(option, optionValue) => option.title === optionValue.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      loadingText="Carregando livros..."
      groupBy={(option) => option.group}
      renderGroup={(params) => (
        <li key={params.key}>
          <ListSubheader sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>
            {params.group}
          </ListSubheader>
          {params.children}
        </li>
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <img
            src={option.thumbnail}
            alt={option.title}
            style={{ width: 32, height: 48, marginRight: 8, objectFit: 'cover', borderRadius: 4 }}
          />
          {option.title}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Pesquisar livros..."
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{params.InputProps.endAdornment}</>,
          }}
        />
      )}
    />
  );
}
