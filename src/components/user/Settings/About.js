import React, { useState } from "react";
import { Box } from "@mui/system";
import AboutBtn from "../../Buttons/AboutBtn";
import { Drawer, Link, Typography } from "@mui/material";
import InsideDrawer from "../InsideDrawer";

const aboutList = [
  {
    label: "Nous contacter",
    link: "mailto:pokey.bar@gmail.com?subject=Demande de renseignements",
  },
];
const linkList = [
  {
    label: "Politique de confidentialité",
    component: `Confidentiality`,
  },
  {
    label: "Conditions générales",
    component: "CG",
  },
];

const Confidentiality = () => {
  const confidentialityDetails = [
    {
      title: "Introduction",
      content: `Votre vie privée est une priorité pour nous. Cette Politique de Confidentialité explique quelles informations nous collectons, comment nous les utilisons et les protégeons.`,
    },
    {
      title: "Données collectées",
      content: `Nous collectons les informations suivantes :

                Utilisateur enregistré : Prénom, numéro de téléphone, adresse e-mail, historique des commandes.

                Client non enregistré : Prénom, numéro de téléphone, adresse e-mail (enregistrés uniquement dans l'historique des commandes).

                Paiements : Traités via Stripe, aucune information bancaire n'est stockée par nos soins.

                Authentification : Gérée par Auth0.`,
    },
    {
      title: "Utilisation des données",
      content: `Les informations collectées sont utilisées pour :

                Gérer et traiter les commandes.

                Améliorer l'expérience utilisateur.

                Communiquer avec les clients concernant leurs commandes.`,
    },
    {
      title: "Partage des données",
      content: `Vos informations ne sont pas partagées avec des tiers, sauf pour assurer les services essentiels (Stripe pour les paiements et Auth0 pour l’authentification).`,
    },
    {
      title: "Conservation des données",
      content: `Les données sont conservées tant que nécessaire pour la gestion des commandes et conformément à nos obligations légales.`,
    },
    {
      title: "Droits des utilisateurs",
      content: `Vous pouvez demander l’accès, la rectification ou la suppression de vos données en nous contactant.`,
    },
    {
      title: "Sécurité",
      content: `Nous mettons en place des mesures de sécurité pour protéger vos données contre tout accès non autorisé.`,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        textAlign: "left",
        padding: 2,
      }}
    >
      {confidentialityDetails.map((item, index) => (
        <Box key={index} mb={2}>
          <Typography variant="h3">
            {index + 1}. {item.title}
          </Typography>
          <Typography variant="body1">{item.content} </Typography>
        </Box>
      ))}
    </Box>
  );
};
const CG = () => {
  const cguDetails = [
    {
      title: "Objet",
      content: `Les présentes CGU définissent les conditions d'utilisation de l'application de Click and Collect.`,
    },
    {
      title: "Accès et Inscription",
      content: `L'accès à l'application est libre. L'inscription est nécessaire pour accéder à certaines fonctionnalités comme la gestion de l'historique des commandes. Lors de l'inscription, l'utilisateur doit accepter les présentes CGU et la Politique de Confidentialité.`,
    },
    {
      title: "Acceptation des Conditions",
      content: `L'inscription ou l'utilisation des services implique l'acceptation pleine et entière des CGU et de la Politique de Confidentialité. L'utilisateur doit cocher une case d'acceptation avant la création de son compte.`,
    },
    {
      title: "Utilisation des Services",
      content: `Les utilisateurs s’engagent à fournir des informations exactes lors de l'inscription ou de la commande, et à ne pas utiliser le service à des fins frauduleuses ou malveillantes.`,
    },
    {
      title: "Responsabilité",
      content: `Nous mettons tout en œuvre pour assurer la disponibilité du service, mais nous ne pouvons être tenus responsables des interruptions, erreurs ou dommages directs ou indirects liés à l'utilisation de l'application.`,
    },
    {
      title: "Modification des CGU",
      content: `Nous nous réservons le droit de modifier les CGU à tout moment. Les utilisateurs seront informés des modifications lors de leur prochaine connexion.`,
    },
  ];
  const cgvDetails = [
    {
      title: "Objet",
      content: `Les présentes CGV encadrent les conditions de vente des produits commandés via notre application de Click and Collect.`,
    },
    {
      title: "Produits et Disponibilité",
      content: `Les produits proposés à la vente sont ceux affichés dans l'application, dans la limite des stocks disponibles.`,
    },
    {
      title: "Commandes",
      content: `Toute commande passée via l'application est considérée comme ferme et définitive une fois validée. Pour les clients non enregistrés, les informations personnelles (prénom, numéro de téléphone, e-mail) sont collectées uniquement pour traiter la commande.`,
    },
    {
      title: "Paiement",
      content: `Les paiements s’effectuent en ligne via Stripe ou d'autres moyens mis à disposition. Aucune information bancaire n'est stockée par notre application. La transaction est sécurisée par le prestataire de paiement.`,
    },
    {
      title: "Livraison / Retrait",
      content: `Les produits sont à retirer dans le point de vente choisi lors de la commande, à l'heure indiquée. Aucun service de livraison n'est proposé.`,
    },
    {
      title: "Annulation et Remboursement",
      content: `Aucune annulation ou remboursement n'est possible une fois la commande validée, sauf en cas d'erreur manifeste de notre part ou de force majeure.`,
    },
    {
      title: "Responsabilité",
      content: `Nous déclinons toute responsabilité en cas de problèmes liés à des services tiers (Stripe, Auth0, etc.).`,
    },
    {
      title: "Litiges",
      content: `Les présentes CGV sont régies par la loi française. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux compétents seront saisis.`,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        textAlign: "left",
        padding: 2,
      }}
    >
      <Box mb={3}>
        <Typography variant="h2" mb={3}>
          Conditions Générales d'Utilisation
        </Typography>
        {cguDetails.map((item, index) => (
          <Box key={index} mb={3}>
            <Typography variant="h3">
              {index + 1}. {item.title}
            </Typography>
            <Typography variant="body1">{item.content} </Typography>
          </Box>
        ))}
      </Box>
      <Box mb={3}>
        <Typography variant="h2" mb={3}>
          Conditions Générales de Vente
        </Typography>
        {cgvDetails.map((item, index) => (
          <Box key={index} mb={3}>
            <Typography variant="h3">
              {index + 1}. {item.title}
            </Typography>
            <Typography variant="body1">{item.content} </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const componentMap = {
  Confidentiality,
  CG,
};

const About = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const ComponentToRender = componentMap[selectedItem?.component];

  const toggleDrawer = (newOpen, item = null) => {
    return () => {
      setOpen(newOpen);
      setSelectedItem(item);
    };
  };

  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            pt: 2,
          }}
        >
          {linkList.map((item, index) => (
            <Link
              key={index}
              sx={{
                textTransform: "none",
                color: "rgba(0, 0, 0, 0.6);",
                fontSize: "0.75rem",
                fontWeight: "400",
                textDecoration: "underline",
              }}
              onClick={toggleDrawer(true, item)}
            >
              {item.label}
            </Link>
          ))}
        </Box>
        <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
          <InsideDrawer
            toggleDrawer={toggleDrawer}
            name={selectedItem?.label}
            back
          >
            {ComponentToRender ? (
              <ComponentToRender />
            ) : (
              <p>Contenu introuvable</p>
            )}
          </InsideDrawer>
        </Drawer>
      </Box>
    </>
  );
};

export default About;
