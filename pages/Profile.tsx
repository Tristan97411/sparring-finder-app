import React, { useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Pressable,
  Modal,
} from "react-native";
import BottomBar from "../src/composants/bottomTab/BottomTabNavigator";
import AuthContext, { AuthStates } from "../src/contexts/auth.ctx";
import Link from "next/link";
import authServices from "../src/services/apis/auth-service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../src/types";

type Sports = {
  name: string;
  years: number;
  wins: number;
  loses: number;
  tieBreaks: number;
};

const sports = [
  { name: "MMA", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Muai Thai", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Kick Boxing", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Boxe Anglaise", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Judo", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Ju Jitsu", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Grappling", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
  { name: "Lutte", years: 0, wins: 0, loses: 0, tieBreaks: 0 },
];

export default function App() {
  const [pseudo, setPseudo] = React.useState("");
  const [adresse, setAdresse] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [selectedSports, setSelectedSports] = React.useState<Sports[]>([]);
  const [selectedSportDetails, setSelectedSportDetails] =
    React.useState<Sports | null>(null);
  // Ajoutez un état pour suivre les années de pratique saisies par l'utilisateur
  const [yearsOfPractice, setYearsOfPractice] = React.useState(0);
  // Ajoutez un état pour suivre les victoires, défaites et matchs nuls saisies par l'utilisateur
  const [victories, setVictories] = React.useState(0);
  const [defeats, setDefeats] = React.useState(0);
  const [ties, setTies] = React.useState(0);

  const authCtx = useContext(AuthContext);

  // Modifiez la fonction handleOptionClick pour mettre à jour l'état selectedSports avec le sport sélectionné
  // const handleOptionClick = (sport: Sports) => {
  //   const isSportSelected = selectedSports.some(
  //     (selectedSport) => selectedSport.name === sport.name
  //   );

  //   if (isSportSelected) {
  //     const updatedSports = selectedSports.filter(
  //       (selectedSport) => selectedSport.name !== sport.name
  //     );
  //     setSelectedSports(updatedSports);
  //     if (selectedSportDetails?.name === sport.name) {
  //       setSelectedSportDetails(null); // Réinitialiser les détails du sport sélectionné si celui-ci est désélectionné
  //     }
  //   } else {
  //     setSelectedSports([...selectedSports, sport]);
  //     setSelectedSportDetails(sport); // Mettre à jour les détails du sport sélectionné uniquement lorsqu'il est sélectionné
  //   }
  // };
  const handleOptionClick = (sport: Sports) => {
    const isSportSelected = selectedSports.some(
      (selectedSport) => selectedSport.name === sport.name
    );

    if (!isSportSelected) {
      setSelectedSports([...selectedSports, sport]);
    }

    setSelectedSportDetails(sport); // Mettre à jour les détails du sport sélectionné
  };

  const handleDeselectSport = (sportName) => {
    const updatedSports = selectedSports.filter(
      (selectedSport) => selectedSport.name !== sportName
    );
    setSelectedSports(updatedSports);
  };
  const SportsOption = ({ sport }) => {
    const isSportSelected = selectedSports.some(
      (selectedSport) => selectedSport.name === sport.name
    );

    return (
      <TouchableOpacity
        style={[
          styles.optionButton,
          isSportSelected && styles.selectedSportsButton,
        ]}
        onPress={() =>
          handleOptionClick({
            name: sport.name,
            years: sport.years || 0,
            wins: sport.wins || 0,
            loses: sport.loses || 0,
            tieBreaks: sport.tieBreaks || 0,
          })
        }
      >
        <Text style={styles.TextOptionPalmares}>{sport.name}</Text>
        {isSportSelected && (
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => handleDeselectSport(sport.name)}
          >
            <Text style={styles.closeIconText}>✖</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  // Fonction pour augmenter le nombre d'années de pratique
  const increaseYearsOfPractice = () => {
    // Augmenter le nombre d'années de pratique de 1

    // Mettre à jour l'état selectedSports en tenant compte de la nouvelle valeur pour les années de pratique
    const updatedSelectedSports = selectedSports.map((sport) => {
      if (sport.name === selectedSportDetails.name) {
        // Si le sport correspond au sport sélectionné, mettre à jour le nombre d'années de pratique
        return {
          ...sport,
          years: sport.years + 1,
        };
      }
      // Sinon, retourner le sport sans le modifier
      return sport;
    });

    // Mettre à jour l'état selectedSports avec les modifications
    setSelectedSports(updatedSelectedSports);
    setSelectedSportDetails({
      ...selectedSportDetails,
      years: selectedSportDetails.years + 1,
    });
  };

  // Fonction pour augmenter le nombre de victoires
  const increaseVictories = () => {
    const updatedSelectedSports = selectedSports.map((sport) => {
      if (sport.name === selectedSportDetails.name) {
        // Si le sport correspond au sport sélectionné, mettre à jour le nombre d'années de pratique
        return {
          ...sport,
          wins: sport.wins + 1,
        };
      }
      // Sinon, retourner le sport sans le modifier
      return sport;
    });

    // Mettre à jour l'état selectedSports avec les modifications
    setSelectedSports(updatedSelectedSports);
    setSelectedSportDetails({
      ...selectedSportDetails,
      wins: selectedSportDetails.wins + 1,
    });
  };
  // Fonction pour augmenter le nombre de défaites
  const increaseDefeats = () => {
    const updatedSelectedSports = selectedSports.map((sport) => {
      if (sport.name === selectedSportDetails.name) {
        // Si le sport correspond au sport sélectionné, mettre à jour le nombre d'années de pratique
        return {
          ...sport,
          loses: sport.loses + 1,
        };
      }
      // Sinon, retourner le sport sans le modifier
      return sport;
    });

    // Mettre à jour l'état selectedSports avec les modifications
    setSelectedSports(updatedSelectedSports);
    setSelectedSportDetails({
      ...selectedSportDetails,
      loses: selectedSportDetails.loses + 1,
    });
  };
  // Fonction pour augmenter le nombre de matchs nuls
  const increaseTies = () => {
    const updatedSelectedSports = selectedSports.map((sport) => {
      if (sport.name === selectedSportDetails.name) {
        // Si le sport correspond au sport sélectionné, mettre à jour le nombre d'années de pratique
        return {
          ...sport,
          tieBreaks: sport.tieBreaks + 1,
        };
      }
      // Sinon, retourner le sport sans le modifier
      return sport;
    });

    // Mettre à jour l'état selectedSports avec les modifications
    setSelectedSports(updatedSelectedSports);
    setSelectedSportDetails({
      ...selectedSportDetails,
      tieBreaks: selectedSportDetails.tieBreaks + 1,
    });
  };
  const decreaseYearsOfPractice = () => {
    if (selectedSportDetails && selectedSportDetails.years > 0) {
      const updatedYears = selectedSportDetails.years - 1;
      setSelectedSportDetails({
        ...selectedSportDetails,
        years: updatedYears,
      });

      // Mettre à jour les données du palmarès sportif dans l'état local
      const updatedSportsPalmares = selectedSports.map((sport) => {
        if (sport.name === selectedSportDetails.name) {
          return {
            ...sport,
            years: updatedYears,
          };
        }
        return sport;
      });
      setSelectedSports(updatedSportsPalmares);
    }
  };

  const decreaseVictories = () => {
    if (selectedSportDetails && selectedSportDetails.wins > 0) {
      const updatedWins = selectedSportDetails.wins - 1;
      setSelectedSportDetails({
        ...selectedSportDetails,
        wins: updatedWins,
      });
      const updatedSportsPalmares = selectedSports.map((sport) => {
        if (sport.name === selectedSportDetails.name) {
          return {
            ...sport,
            wins: updatedWins,
          };
        }
        return sport;
      });
      setSelectedSports(updatedSportsPalmares);
    }
  };

  const decreaseDefeats = () => {
    if (selectedSportDetails && selectedSportDetails.loses > 0) {
      const updatedLoses = selectedSportDetails.loses - 1;
      setSelectedSportDetails({
        ...selectedSportDetails,
        loses: updatedLoses,
      });
      const updatedSportsPalmares = selectedSports.map((sport) => {
        if (sport.name === selectedSportDetails.name) {
          return {
            ...sport,
            loses: updatedLoses,
          };
        }
        return sport;
      });
      setSelectedSports(updatedSportsPalmares);
    }
  };

  const decreaseTies = () => {
    if (selectedSportDetails && selectedSportDetails.tieBreaks > 0) {
      const updatedTieBreaks = selectedSportDetails.tieBreaks - 1;
      setSelectedSportDetails({
        ...selectedSportDetails,
        tieBreaks: updatedTieBreaks,
      });
      const updatedSportsPalmares = selectedSports.map((sport) => {
        if (sport.name === selectedSportDetails.name) {
          return {
            ...sport,
            tieBreaks: updatedTieBreaks,
          };
        }
        return sport;
      });
      setSelectedSports(updatedSportsPalmares);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedSportDetails((prevDetails) => ({
      ...prevDetails,
      [field]: parseInt(value, 10) || 0,
    }));
  };

  const profilRegistered = async () => {
    try {
      setIsLoading(true);
      const result = await authServices.updateUserData(
        pseudo,
        adresse,
        telephone
      );

      alert(result.detail);
    } catch (err: any) {
      console.log(err);
      alert(err.detail);
    }
  };

  const saveChanges = async () => {
    try {
      setIsLoading(true);

      // Vérifier si aucun sport n'est sélectionné
      if (selectedSports.length === 0) {
        throw new Error("Aucun sport sélectionné !");
      }

      // Mettre à jour les données du palmarès sportif dans le backend
      const updatedSportsPalmares = [...selectedSports];
      console.log(updatedSportsPalmares);
      // Mettre à jour les détails du sport sélectionné

      await authServices.updateSportsPalmares(updatedSportsPalmares);
      setIsLoading(false);
      alert("Palmarès mis à jour avec succès !");
    } catch (err: any) {
      setIsLoading(false);
      console.log(err);
      alert("Erreur lors de la mise à jour du palmarès");
    }
  };
  // Fonction pour charger les informations du profil depuis AsyncStorage
  const loadProfileData = async () => {
    try {
      const userDataListener = authServices.listenToUserData(
        authCtx.userId,
        (userData: UserData) => {
          setAdresse(userData.profileData?.adresse || "");
          setPseudo(userData.profileData?.pseudo || "");
          setTelephone(userData.profileData?.telephone || "");
          setSelectedSports(userData.sportsPalmares || []);
        }
      );
    } catch (error) {
      console.error(
        "Erreur lors du chargement des informations du profil:",
        error
      );
    }
  };
  // Appel de la fonction pour charger les données du profil lorsque le composant est monté
  React.useEffect(() => {
    if (authCtx.userId) {
      loadProfileData();
    }
  }, [authCtx.userId]);

  if (authCtx.authState == AuthStates.NOT_AUTH) {
    return (
      <View style={styles.container}>
        <Link style={styles.buttonConnect} href="/SignIn">
          <Text style={styles.TextConnect}>Se Connecter</Text>
        </Link>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.profileLink}>
        <Link style={styles.VoirProfil} href="/profil">
          Voir mon profil
        </Link>
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pseudo:</Text>
        <TextInput
          style={styles.input}
          value={pseudo}
          onChangeText={setPseudo}
          placeholder="Entrez votre pseudo"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Adresse:</Text>
        <TextInput
          style={styles.input}
          value={adresse}
          onChangeText={setAdresse}
          placeholder="Entrez votre adresse"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Téléphone:</Text>
        <TextInput
          style={styles.input}
          value={telephone}
          onChangeText={setTelephone}
          placeholder="Entrez votre numéro de téléphone"
        />
        <Pressable
          style={styles.buttonPalmares}
          onPress={() => setShowOptions(true)}
        >
          <Text style={styles.TextPalmares}>Palmarès</Text>
        </Pressable>

        {/* Modal des options */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showOptions}
          onRequestClose={() => setShowOptions(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Mon Palmares</Text>
              <Text style={styles.FontSize1}>Sélectionner une discipline</Text>
              <Text style={styles.FontSize2}>
                Vous pourrez ajouter d'autre discipline plus tard
              </Text>
              <View style={styles.optionButtonsContainer}>
                {[
                  "MMA",
                  "Muai Thai",
                  "Kick Boxing",
                  "Boxe Anglaise",
                  "Judo",
                  "Ju Jitsu",
                  "Grappling",
                  "Lutte",
                ].map((sportName) => (
                  <SportsOption
                    key={sportName}
                    sport={
                      selectedSports.find(
                        (sport) => sport.name === sportName
                      ) || { name: sportName }
                    }
                  />
                ))}
              </View>
              <Pressable
                style={styles.closeButton}
                onPress={() => setShowOptions(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedSportDetails !== null}
          onRequestClose={() => setSelectedSportDetails(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedSportDetails && (
                <Text style={styles.modalTitle}>
                  {selectedSportDetails.name}
                </Text>
              )}
              <View style={styles.buttonContainer}>
                <Text>Années de pratique: </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={decreaseYearsOfPractice}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(
                    selectedSportDetails ? selectedSportDetails.years : ""
                  )}
                  onChangeText={(value) => handleInputChange("years", value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={increaseYearsOfPractice}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <Text>Victoires: </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={decreaseVictories}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(
                    selectedSportDetails ? selectedSportDetails.wins : ""
                  )}
                  onChangeText={(value) => handleInputChange("wins", value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={increaseVictories}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <Text>Défaites: </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={decreaseDefeats}
                >
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(
                    selectedSportDetails ? selectedSportDetails.loses : ""
                  )}
                  onChangeText={(value) => handleInputChange("loses", value)}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={increaseDefeats}
                >
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.buttonContainer}>
                <Text>Matchs nuls: </Text>
                <TouchableOpacity style={styles.button} onPress={decreaseTies}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={String(
                    selectedSportDetails ? selectedSportDetails.tieBreaks : ""
                  )}
                  onChangeText={(value) =>
                    handleInputChange("tieBreaks", value)
                  }
                />
                <TouchableOpacity style={styles.button} onPress={increaseTies}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                <Text style={styles.buttonText}>Enregistrer</Text>
              </TouchableOpacity>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedSportDetails(null)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Pressable style={styles.buttonConnecter} onPress={profilRegistered}>
          <Text style={styles.TextEnregistré}>Enregistré</Text>
        </Pressable>
      </View>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#cacbcc",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "75%",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    padding: 10,
    width: 40,
    backgroundColor: "#e3e3e1",
    shadowColor: "#9a9c9a",
    shadowRadius: 5,
    textAlign: "center",
  },
  buttonPalmares: {
    backgroundColor: "#FFFCFC",
    padding: 9,
    marginTop: 20,
    fontWeight: "bold",
    width: "100%",
    borderRadius: 6,
    borderColor: "#622bb5",
    borderWidth: 3,
    alignItems: "center",
  },
  buttonConnecter: {
    backgroundColor: "#622bb5",
    padding: 9,
    marginTop: 10,
    fontWeight: "bold",
    width: "100%",
    borderRadius: 6,
    borderColor: "#622bb5",
    borderWidth: 3,
    alignItems: "center",
    color: "#622bb5",
  },
  TextPalmares: {
    color: "#622bb5",
    fontWeight: "bold",
  },
  TextEnregistré: {
    color: "white",
    fontWeight: "bold",
  },
  profileLink: {
    position: "absolute",
    top: 180,
    right: 50,
  },
  VoirProfil: {
    color: "Black",
  },
  TextOptionPalmares: {
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Fond sombre semi-transparent
  },
  modalContent: {
    width: "80%", // Largeur de la modalité
    backgroundColor: "#e1e1e3", // Fond sombre
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Ombre pour la profondeur
    marginTop: 50, // Position en haut de la page
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  optionButtonsContainer: {
    flexDirection: "row", // Boutons alignés horizontalement
    flexWrap: "wrap", // Passe à la ligne suivante si nécessaire
    justifyContent: "space-between", // Espace égal entre les boutons
  },
  optionButton: {
    backgroundColor: "#202126",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    marginHorizontal: 7,
    borderRadius: 6,
    width: "40%",
  },
  closeButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  // mondalTitleContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   fontWeight: "bold",
  //   fontSize: 20,
  // },
  selectedSportsButton: {
    backgroundColor: "#04627C", // Couleur de fond pour l'option sélectionnée
  },
  FontSize1: {
    fontSize: 14,
    fontWeight: "500",
  },
  FontSize2: {
    fontSize: 10,
    marginBottom: 6,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    backgroundColor: "#622bb5",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonConnect: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginRight: 10,
    backgroundColor: "#622bb5",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 16,
    paddingLeft: 16,
  },
  TextConnect: {
    color: "white",
    fontWeight: "bold",
  },
  closeIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5,
    backgroundColor: "red",
    borderRadius: 100,
  },
  closeIconText: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#622bb5",
    alignItems: "center",
    marginTop: 20,
  },
});
