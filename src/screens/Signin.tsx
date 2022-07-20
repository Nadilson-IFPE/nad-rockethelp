import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";
import { useState } from "react";
import { Alert } from "react-native";
import Logo from "../assets/logo_primary.svg";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import auth from "@react-native-firebase/auth";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { colors } = useTheme();

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Entrar", "Informe e-mail e senha!");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      //.then((response) => {
      // Somente para ver os dados do usuário que realizou login
      //  console.log(response);
      // })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          // Boa prática de programação (segurança):
          // não avisar ao usuário onde ele está errando no login
          // para evitar que um usuário mal intencionado tente
          // adivinhar os dados corretos de login de terceiros
          //return Alert.alert("Entrar", "E-mail inválido.");

          // O modo recomendado é:
          return Alert.alert("Entrar", "E-mail ou senha inválida.");
        }
        if (error.code === "auth/user-not-found") {
          // Ver comentários no invalid-email
          // return Alert.alert("Entrar", "Usuário não cadastrado.");

          return Alert.alert("Entrar", "E-mail ou senha inválida.");
        }

        if (error.code === "auth/wrong-password") {
          // Ver comentários no invalid-email
          // return Alert.alert("Entrar", "Senha inválida.");

          return Alert.alert("Entrar", "E-mail ou senha inválida.");
        }

        return Alert.alert("Entrar", "Não foi possível acessar o sistema.");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
