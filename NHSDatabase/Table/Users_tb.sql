CREATE TABLE Users_tb (
  USER_ID NUMBER GENERATED BY DEFAULT ON NULL AS IDENTITY constraint PK_USER_ID primary key ,
  USER_TYPE NUMBER(1) NOT NULL,
  PASSWORD VARCHAR2(60) NOT NULL,
  USERNAME VARCHAR2(30) NOT NULL,
  FIRST_NAME VARCHAR2(30) NOT NULL,
  SURNAME VARCHAR2(30) NOT NULL,
  EMAIL VARCHAR2(50) NOT NULL,
  ADDRESS VARCHAR2(255) NOT NULL,
  PHONE_NUMBER VARCHAR2(30) NOT NULL,
  EXPENSE_CODE VARCHAR2(6)
);