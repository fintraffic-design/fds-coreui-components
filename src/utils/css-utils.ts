import {
  FdsColorText1000,
  FdsTypographyUiLabelFontFamily,
  FdsTypographyUiLabelFontSize,
  FdsTypographyUiLabelFontWeight,
  FdsTypographyUiLabelLetterSpacing,
  FdsTypographyUiLabelLineHeight,
} from '@fintraffic-design/coreui-css'
import { css } from 'lit'
import { tokenVar } from './token-utils'

export const uiLabelText = css`
  .ui-label-text {
    font-family: ${tokenVar(FdsTypographyUiLabelFontFamily)};
    font-style: 'medium';
    font-weight: ${tokenVar(FdsTypographyUiLabelFontWeight)};
    font-size: ${tokenVar(FdsTypographyUiLabelFontSize)};
    line-height: ${tokenVar(FdsTypographyUiLabelLineHeight)};
    letter-spacing: ${tokenVar(FdsTypographyUiLabelLetterSpacing)};

    color: ${tokenVar(FdsColorText1000)};
  }
`
