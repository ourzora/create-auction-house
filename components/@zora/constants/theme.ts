export const ThemeOptions = {
  /**
   * Overall preview card settings (width height and background)
   * @default {width: '330px', height: '330px', background: 'transparent'}
   */
  previewCard: {
    width: "330px",
    height: "330px",
    background: "white",
  },

  nftProposalCard: {
    mediaWidth: "160px",
    mediaHeight: "160px",
  },

  /**
   * Flag if showing the nft creator on full view
   * should be enabled
   * @default true
   */
  showCreator: true,

  /**
   * Flag if ens resolution should be automatically used
   * @default true
   */
  useEnsResolution: true,

  /**
   * Set an overriding preferred IPFS provider here
   * Include a trailing slash
   */
  preferredIPFSGateway: 'https://ipfs.io/ipfs/',

  /**
   * Flag if zora username resolution should be automatically used
   * @default true
   */
  useZoraUsernameResolution: true,
   
  /**
   * Flag if showing the nft owner on full view
   * should be enabled
   * @default true
   */
  showOwner: true,
  
  /**
   * Flag if showing transaction history links on full view
   * should be enabled
   * @default true
   */
  showTxnLinks: true,

  /**
   * Padding for preview card text block
   * @default 20px
   */
  spacingUnit: "20px",
  
  /**
   * Padding for preview card text block
   * @default 10px 15px
   */
  textBlockPadding: "10px 15px",
  /**
   * Border style for preview card text block
   * @default 2px solid #e6e6e6
   */
  borderStyle: "2px solid #e6e6e6",

  /**
   * Line-spacing on preview component
   * @default 24
   */
  lineSpacing: 24,

  /**
   * Maximum number of decimal digits to show
   * for pricing information
   * @default 8
   */
  maximumPricingDecimals: 8,

  /**
   * Color for link on full preview page authenticity link
   * @default #000
   */
  linkColor: "#000",

  /**
   * Settings for body text font
   * @default font-family: Inter, Helvetica; font-weight: 400;
   */
  bodyFont: `
    font-family: Inter, Helvetica;
    font-weight: 400;
  `,

  /**
   * Settings for title font
   * Type is parsed as a css string.
   * @default font-family: Inter, Helvetica; font-weight: 500;
   */
  titleFont: `
    font-family: Inter, Helvetica;
    font-weight: 500;
  `,

  /**
   * Settings for header font
   * Type is parsed as a css string.
   * @default font-family: Inter, Helvetica; font-weight: 500;
   */
  headerFont: `
    font-family: Inter, Helvetica;
    font-weight: 500;
  `,

  /**
   * Font to use when rendering text NFTs
   * @default {fontFamily: "Times New Roman"}
   */
  mediaContentFont: {
    fontFamily: "Times New Roman",
  },

  /**
   * Button color configurations
   * @default {primaryBackground: '#333', primaryText: '#fff', background: '#eee'}
   */
  buttonColor: {
    primaryBackground: "#333",
    primaryText: "#fff",
    background: "#eee",
    text: "#000",
  },

  /**
   * Border radius to use around preview card
   * @default 4
   */
  defaultBorderRadius: 4,

  /**
   * Font size base for full view page
   * @default 16
   */
  fontSizeFull: 16,

  /**
   * Audio Player Color configurations
   * @default {waveformColor: '#999, progressColor: '#333'}
   */
   audioColors: {
    waveformColor: '#999',
    progressColor: '#333'
   },

   /**
   * Background color for loading media content
   * @default {placeHolderColor '#e6e6e6'}
   */
    placeHolderColor: '#e6e6e6',
   
  /**
   * Flag if showing the nft collection tag on full view
   * should be enabled
   * @default true
   */
   useCollectionTag: true,
};

export type ThemeOptionsType = typeof ThemeOptions;
