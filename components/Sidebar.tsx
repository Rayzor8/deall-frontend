import { Heading, Link as LinkChakra } from "@chakra-ui/react";
import { Box, List, ListIcon, ListItem } from "@chakra-ui/react";
import Link from "next/link";
import { BsCardList, BsCart2 } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Sidebar() {
  const Links = [
    { name: "Products", href: "/", icon: BsCardList },
    { name: "Carts", href: "/carts", icon: BsCart2 },
  ];

  const router = useRouter();

  const activeNav = (href: string) =>
    router.pathname === href ? { color: "blue" } : {};

  return (
    <Box as="nav">
      <List
        spacing={4}
        display="flex"
        flexDirection={{ base: "row", md: "column" }}
        justifyContent="start"
        alignItems={{ base: "self-end", md: "start" }}
        gap={{ base: 4, md: 0 }}
      >
        {Links.map((link) => (
          <ListItem key={link.name}>
            <LinkChakra as={Link} href={link.href}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <ListIcon as={link.icon} />
                <Heading style={activeNav(link.href)} as="h3" size="xs">
                  {" "}
                  {link.name}
                </Heading>
              </Box>
            </LinkChakra>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
