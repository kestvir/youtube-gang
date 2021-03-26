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
    bg: "white",
  };

  const activeStyles = {
    bg: "blue.300",
  };

  const handlePageChange = (page) => {
    setCurPage(page);
  };

  return (
    <Flex>
      <Paginator
        onPageChange={handlePageChange}
        pagesQuantity={pagesQuantity - 1}
      >
        <Previous bg="white">
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
        <Next bg="white">
          <CgChevronRight />
        </Next>
      </Paginator>
    </Flex>
  );
};

export default Pagination;
