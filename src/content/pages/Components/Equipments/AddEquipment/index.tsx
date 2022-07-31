import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextareaAutosize,
  TextField,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  ADDRESS_TEXT,
  CITIZEN_TEXT,
  COMFIRM_BUTTON_TEXT,
  DESCRIPTION_TEXT,
  EQUIPMENT_ADD,
  EQUIPMENT_AMOUNT_TEXT,
  EQUIPMENT_LIST_TITLE_TEXT,
  EQUIPMENT_MANAGEMENT,
  EQUIPMENT_TEXT,
  EQUIPMENT_TYPE_TEXT,
  GENDER_TEXT,
  NAME_TEXT,
  PASSWORD_TEXT,
  PHONE_TEXT,
  SALARY_TEXT,
  STATUS_TEXT,
  USERNAME_TEXT
} from 'src/constants';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import validator from 'validator';

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

const Input = styled('input')({
  display: 'none'
});

function AddEquipment() {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountError, setAmountError] = useState(false);
  const [type, setType] = useState('');
  const [typeError, setTypeError] = useState(false);

  const validateData = () => {
    if (validator.isEmpty(name)) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!validator.isNumeric(amount)) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  };

  // useEffect(() => {
  //   if (imageUrl) {
  //     setImageUrl(URL.createObjectURL(imageUrl));
  //   }
  // }, [imageUrl]);

  const handleChangeImage = (e) => {
    const [file] = e.target.files;
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <Helmet>
        <title>Equipment - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} lg={12}>
            <Typography variant="h2" component="h2" gutterBottom>
              {EQUIPMENT_ADD}
            </Typography>
          </Grid>
        </Grid>
      </PageTitleWrapper>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader
                style={{ backgroundColor: '#F9FAFC', fontSize: '19px' }}
                title={DESCRIPTION_TEXT}
              />
              <Divider />
              <CardContent style={{}}>
                <Box marginBottom="20px" marginX="10px">
                  <CardCover>
                    <CardMedia
                      image={
                        imageUrl
                          ? imageUrl
                          : '/static/images/placeholders/covers/upload.jpg'
                      }
                    />
                    <CardCoverAction>
                      <Input
                        accept="image/*"
                        id="change-cover"
                        multiple
                        type="file"
                        onChange={handleChangeImage}
                      />
                      <label htmlFor="change-cover">
                        <Button
                          startIcon={<UploadTwoToneIcon />}
                          variant="contained"
                          component="span"
                          style={{ fontSize: '17px' }}
                        >
                          อัปโหลดรูปภาพ
                        </Button>
                      </label>
                    </CardCoverAction>
                  </CardCover>
                </Box>
                <Box component="form" noValidate autoComplete="off">
                  <div>
                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="stretch"
                    >
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                      >
                        <TextField
                          required
                          fullWidth
                          id="name"
                          inputProps={{ maxLength: 255 }}
                          value={name}
                          label={'ชื่อ' + EQUIPMENT_TEXT}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                        {nameError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอกชื่อ{EQUIPMENT_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>

                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={4}
                        md={4}
                        lg={4}
                      >
                        <TextField
                          required
                          fullWidth
                          id="citizen"
                          value={amount}
                          label={EQUIPMENT_AMOUNT_TEXT}
                          onChange={(e) => {
                            const regex = /^[0-9\b]+$/;
                            if (
                              e.target.value === '' ||
                              regex.test(e.target.value)
                            ) {
                              setAmount(parseInt(e.target.value));
                            }
                          }}
                        />
                        {amountError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณากรอก{EQUIPMENT_AMOUNT_TEXT}ให้ถูกต้อง
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                      <Grid
                        paddingX="10px"
                        marginTop="10px"
                        xs={12}
                        sm={2}
                        md={2}
                        lg={2}
                      >
                        <FormControl fullWidth>
                          <InputLabel id="gender">
                            {EQUIPMENT_TYPE_TEXT}
                          </InputLabel>
                          <Select
                            required
                            labelId="gender-label"
                            id="gender-select"
                            value={type}
                            defaultValue={EQUIPMENT_TYPE_TEXT}
                            label="gender"
                            onChange={(e) => {
                              setType(e.target.value);
                            }}
                          >
                            <MenuItem style={{ fontSize: '17px' }} value={''}>
                              กรุณาเลือกหน่วย
                            </MenuItem>
                            <MenuItem
                              style={{ fontSize: '17px' }}
                              value={'ชาย'}
                            >
                              ชาย
                            </MenuItem>
                            <MenuItem
                              style={{ fontSize: '17px' }}
                              value={'หญิง'}
                            >
                              หญิง
                            </MenuItem>
                          </Select>
                        </FormControl>
                        {typeError ? (
                          <Typography
                            fontFamily="Quark-Bold"
                            fontSize="16px"
                            paddingX="10px"
                            color="red"
                          >
                            กรุณาเลือก{EQUIPMENT_TYPE_TEXT}
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                  </div>
                </Box>
                <Box>
                  <Grid
                    container
                    direction="row"
                    justifyContent="end"
                    alignItems="stretch"
                    marginTop="20px"
                  >
                    <Grid
                      paddingX="10px"
                      marginTop="10px"
                      xs={12}
                      sm={12}
                      md={2}
                      lg={2}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        style={{ fontSize: '20px' }}
                        color="primary"
                        onClick={(e) => {
                          validateData();
                        }}
                      >
                        {COMFIRM_BUTTON_TEXT}
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default AddEquipment;
