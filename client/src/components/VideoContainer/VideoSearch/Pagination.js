import React from "react";
import {
  Previous,
  Paginator,
  PageGroup,
  Page,
  Next,
  generatePages,
} from "chakra-paginator";
import { Flex } from "@chakra-ui/react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const Pagination = ({ pagesQuantity, setCurPage }) => {
  const normalStyles = {
    bg: "lightestGrey",
    w: "40px",
    h: "40px",
    mx: "5px",
  };

  const activeStyles = {
    colorScheme: "brand",
    w: "40px",
    h: "40px",
    mx: "5px",
  };

  const handlePageChange = (page) => {
    setCurPage(page);
  };

  return (
    <Flex justifyContent="center">
      <Paginator
        onPageChange={handlePageChange}
        pagesQuantity={pagesQuantity - 1}
      >
        <Previous
          color="lighterGrey.500"
          bg="transparent"
          fontSize={18}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        >
          <CgChevronLeft />
        </Previous>
        <PageGroup>
          {generatePages(pagesQuantity)?.map((page) => (
            <Page
              key={`paginator_page_${page}`}
              page={page}
              normalStyles={normalStyles}
              activeStyles={activeStyles}
            />
          ))}
        </PageGroup>
        <Next
          color="lighterGrey.500"
          bg="transparent"
          fontSize={18}
          _hover={{ bg: "transparent" }}
          _active={{ bg: "transparent" }}
        >
          <CgChevronRight />
        </Next>
      </Paginator>
    </Flex>
  );
};

export default Pagination;
