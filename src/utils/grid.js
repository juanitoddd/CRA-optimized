import React from "react";
import styled from "styled-components";

export default styled.div`
    display: grid;
    grid-template-columns: ${props => props.cols};    
`;