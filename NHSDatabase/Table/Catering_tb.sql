CREATE TABLE Catering_tb (
  CATERING_ID NUMBER(4) NOT NULL constraint PK_CATERING_ID primary key,
  CATERING_NAME VARCHAR2(30) NOT NULL,
  CADDRESS VARCHAR2(255) NOT NULL,
  FULFILMENT VARCHAR2(25) NOT NULL constraint
 C_FULFILMENT CHECK (FULFILMENT IN 
('Breakfast', 'Dinner', 'Breakfast and Dinner')),
  HALAL NUMBER(1) NOT NULL,
  KOSHER NUMBER(1) NOT NULL,
  VEGAN NUMBER(1) NOT NULL,
  VEGETARIAN NUMBER(1) NOT NULL,
  GLUTEN NUMBER(1) NOT NULL,
  EXTERNAL NUMBER(1) NOT NULL,
  VENDING_MACHINE NUMBER(1) NOT NULL,
  WATER_FOUNTAIN NUMBER(1) NOT NULL
);