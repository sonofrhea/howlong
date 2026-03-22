import { Bitcoin, Building2, Landmark, Layers, UserRoundCog } from "lucide-react";
import { iconStyles } from "./Styles";








export const CORE_ICONS = {
    companyProfile: <Building2 strokeWidth={1.75} className={iconStyles.small} />,
    userProfile: <UserRoundCog strokeWidth={1.75} className={iconStyles.small} />,
    banks: <Landmark strokeWidth={1.75} className={iconStyles.small} />,
    currencies: <Bitcoin strokeWidth={1.75} className={iconStyles.small} />,
    eInvoiceSubmissions: <Layers strokeWidth={1.75} className={iconStyles.small} />,
}