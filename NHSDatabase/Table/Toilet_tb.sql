CREATE TABLE Toilet_tb (
  TOILET_ID NUMBER(4) constraint PK_TOILET_ID primary key,
  GENDERS NUMBER(1) NOT NULL,
  DISABILITY_ASSESSIBLE NUMBER(1) NOT NULL,
  BABY_CHANGING NUMBER(1) NOT NULL,
  LAST_CLEANED DATE NOT NULL
);