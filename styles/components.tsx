import styled from '@emotion/styled'

export const PageWrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
  max-width: var(--base-unit);
  position: relative;
  padding:
    var(--space-sm)
    var(--space-sm)
    var(--space-md);
`