import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { OriginalMetaTags } from "../components/MetaTags";
import { NextChakraLinkWithHover } from "../components/NextChakraLink";
import themeColor from "../utils/color";
import { createUrqlClient } from "../utils/createUrqlClient";
import { getRouterQueryAsString } from "../utils/getRouterQuery";

export const PrivacyPage = () => {

  const router = useRouter();
  const next = getRouterQueryAsString(router.query.next);

  const getHomeLink = () => {
    if (next !== "") return next;
    return "/"
  }

  return (
    <Flex
      bgColor={themeColor.chakraBlue6}
      justify="center"
      p="80px 62px"
      minH="100vh"
      w="100%"
      h="100%"
    >
      <OriginalMetaTags pageName="Privacy" />
      <Stack>
        <NextChakraLinkWithHover href={getHomeLink()}>
          <Button variant="link" color="white">
            {`←`} Home
          </Button>
        </NextChakraLinkWithHover>
        <Flex direction={["column", "column", "row"]}>
          <Text fontSize="48px" fontWeight={600} color="white" mr="16px">
            Kebijakan Privasi
          </Text>
          <Stack color="white" w="100%">
            {[
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. At risus viverra adipiscing at in tellus integer feugiat. Elementum curabitur vitae nunc sed velit dignissim. Odio euismod lacinia at quis risus. Nisl condimentum id venenatis a condimentum vitae sapien. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor. Lectus nulla at volutpat diam ut venenatis tellus. Adipiscing vitae proin sagittis nisl rhoncus. Sem nulla pharetra diam sit amet nisl suscipit adipiscing. Lacus laoreet non curabitur gravida arcu ac tortor dignissim. Lacus vestibulum sed arcu non odio euismod lacinia at. In arcu cursus euismod quis. Ultrices eros in cursus turpis massa tincidunt dui. Diam donec adipiscing tristique risus nec feugiat in. Egestas congue quisque egestas diam in arcu cursus euismod quis.",
              "Turpis egestas sed tempus urna et pharetra pharetra massa massa. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Justo laoreet sit amet cursus sit. Feugiat in ante metus dictum at tempor commodo ullamcorper a. Amet facilisis magna etiam tempor. Vehicula ipsum a arcu cursus vitae congue mauris rhoncus aenean. Pretium aenean pharetra magna ac. Convallis aenean et tortor at. Eget est lorem ipsum dolor sit amet. Adipiscing diam donec adipiscing tristique risus nec feugiat. Pellentesque adipiscing commodo elit at imperdiet dui accumsan sit. Nunc faucibus a pellentesque sit amet. Non diam phasellus vestibulum lorem. Vitae turpis massa sed elementum tempus. Quam pellentesque nec nam aliquam. Id consectetur purus ut faucibus pulvinar elementum. Consectetur adipiscing elit duis tristique. Blandit aliquam etiam erat velit scelerisque in dictum non consectetur. Sed risus ultricies tristique nulla aliquet enim tortor at.",
              "Velit aliquet sagittis id consectetur. Ac turpis egestas sed tempus urna. Odio aenean sed adipiscing diam donec. Quisque sagittis purus sit amet. Aliquam faucibus purus in massa tempor. Vitae tortor condimentum lacinia quis vel eros. Rhoncus dolor purus non enim praesent elementum facilisis. Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Dapibus ultrices in iaculis nunc. Velit dignissim sodales ut eu sem. Sit amet dictum sit amet justo. Interdum velit euismod in pellentesque massa placerat. Hendrerit gravida rutrum quisque non tellus. Auctor elit sed vulputate mi sit. Odio eu feugiat pretium nibh. Arcu cursus euismod quis viverra nibh. In nisl nisi scelerisque eu ultrices vitae auctor. Morbi enim nunc faucibus a pellentesque sit amet porttitor. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper.",
              "Consequat id porta nibh venenatis cras sed. Laoreet non curabitur gravida arcu ac tortor. Hac habitasse platea dictumst vestibulum. Nulla posuere sollicitudin aliquam ultrices sagittis orci a. Pretium fusce id velit ut tortor pretium. Diam sit amet nisl suscipit adipiscing bibendum. Ornare lectus sit amet est placerat in egestas. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Hendrerit gravida rutrum quisque non tellus orci ac auctor augue. Enim tortor at auctor urna nunc id cursus metus aliquam. Lacus vestibulum sed arcu non odio euismod lacinia at quis. Imperdiet sed euismod nisi porta. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Velit dignissim sodales ut eu sem integer vitae justo eget. Risus sed vulputate odio ut enim blandit volutpat maecenas. Sit amet justo donec enim diam vulputate. Varius morbi enim nunc faucibus a pellentesque. Risus at ultrices mi tempus imperdiet nulla malesuada. Mi ipsum faucibus vitae aliquet nec. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet.",
              "Quis varius quam quisque id diam. Justo donec enim diam vulputate. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Etiam erat velit scelerisque in dictum non consectetur a erat. Fames ac turpis egestas sed tempus. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit. Vitae suscipit tellus mauris a diam maecenas sed enim. Sit amet consectetur adipiscing elit ut aliquam purus sit. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat. Blandit libero volutpat sed cras ornare arcu. Auctor elit sed vulputate mi. Elit sed vulputate mi sit amet mauris commodo quis imperdiet. Pellentesque massa placerat duis ultricies lacus sed turpis. Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Nulla aliquet enim tortor at auctor urna nunc id cursus.",
              "Malesuada pellentesque elit eget gravida cum sociis natoque penatibus et. At consectetur lorem donec massa sapien faucibus et molestie ac. Tortor consequat id porta nibh venenatis cras sed. Diam maecenas sed enim ut sem. Mi eget mauris pharetra et ultrices neque ornare. Aliquet enim tortor at auctor urna. A diam sollicitudin tempor id eu nisl nunc. Tincidunt eget nullam non nisi. Mi proin sed libero enim sed faucibus turpis in. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Mauris rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Id venenatis a condimentum vitae sapien pellentesque. Netus et malesuada fames ac turpis egestas sed. Elementum eu facilisis sed odio. Lectus proin nibh nisl condimentum id. Dui ut ornare lectus sit amet est.",
              "Parturient montes nascetur ridiculus mus. Imperdiet dui accumsan sit amet nulla facilisi morbi. Eget felis eget nunc lobortis mattis aliquam faucibus purus in. Elit at imperdiet dui accumsan. Ac odio tempor orci dapibus ultrices. In ante metus dictum at tempor commodo ullamcorper. Neque laoreet suspendisse interdum consectetur libero. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum. Arcu vitae elementum curabitur vitae nunc sed velit. Felis eget nunc lobortis mattis aliquam faucibus. Enim praesent elementum facilisis leo. Nunc mi ipsum faucibus vitae aliquet nec. Vel facilisis volutpat est velit egestas. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Facilisis volutpat est velit egestas. Arcu dictum varius duis at consectetur lorem donec. Fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Donec ac odio tempor orci dapibus ultrices in iaculis.",
              "Neque viverra justo nec ultrices. Scelerisque varius morbi enim nunc faucibus a pellentesque sit. At elementum eu facilisis sed odio morbi quis commodo. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. A pellentesque sit amet porttitor eget dolor morbi non arcu. Nec ullamcorper sit amet risus nullam eget felis eget nunc. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Vitae ultricies leo integer malesuada nunc vel risus commodo viverra. Nulla facilisi morbi tempus iaculis urna id volutpat. Est ultricies integer quis auctor elit sed vulputate. A cras semper auctor neque vitae tempus quam pellentesque. Mi quis hendrerit dolor magna eget est lorem ipsum. In pellentesque massa placerat duis ultricies lacus. Pulvinar etiam non quam lacus suspendisse faucibus. Nam libero justo laoreet sit amet cursus sit. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Viverra nam libero justo laoreet.",
              "Purus non enim praesent elementum facilisis leo vel fringilla. Gravida dictum fusce ut placerat. Non enim praesent elementum facilisis leo vel fringilla est. Pellentesque adipiscing commodo elit at imperdiet. Egestas sed tempus urna et pharetra pharetra massa. Congue nisi vitae suscipit tellus mauris a. Orci sagittis eu volutpat odio. Ut consequat semper viverra nam libero justo laoreet sit amet. Rhoncus dolor purus non enim praesent elementum facilisis leo. Semper risus in hendrerit gravida rutrum quisque non tellus. Adipiscing tristique risus nec feugiat in. Suspendisse sed nisi lacus sed viverra tellus. Aliquam purus sit amet luctus. Eget sit amet tellus cras adipiscing enim.",
              "Sem integer vitae justo eget. Justo laoreet sit amet cursus sit amet dictum sit amet. Nulla at volutpat diam ut venenatis tellus in metus. Ut tellus elementum sagittis vitae. Orci phasellus egestas tellus rutrum tellus. Eget dolor morbi non arcu risus quis varius quam quisque. Consequat id porta nibh venenatis cras sed felis. Elementum facilisis leo vel fringilla est ullamcorper eget nulla facilisi. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. At volutpat diam ut venenatis tellus. Nunc sed id semper risus in hendrerit gravida rutrum quisque. Risus quis varius quam quisque id diam vel quam. At tempor commodo ullamcorper a lacus vestibulum sed. Ipsum dolor sit amet consectetur adipiscing elit. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique. Eget arcu dictum varius duis at consectetur lorem donec massa. Augue mauris augue neque gravida.",
            ].map((lorem) => (
              <Text key={lorem}>
                {lorem}
              </Text>
            ))}
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient)(PrivacyPage);