import React from "react";
import { Box } from "@mui/system";
import AboutBtn from "../../Buttons/AboutBtn";

const aboutList = [
  {
    label: "Nous contater",
    link: "mailto:pokey.bar@gmail.com?subject=Demande de renseignements",
  },
  { label: "Conditions générales", link: "/conditionsgenerales" },
  {
    label: "Politique de confidentialité",
    link: "/politiquedeconfidentialite",
  },
];

const About = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          borderTop: "1px solid #0000001a",
          borderBottom: "1px solid #0000001a",
        }}
      >
        {aboutList.map((item, index) => (
          <AboutBtn
            label={item.label}
            key={index}
            link={item.link}
            isLast={index === aboutList.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};

export default About;
