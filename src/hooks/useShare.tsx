import { Navigator } from "../types/Navigator";
import copyToClipboard from "../util/copyToClipboard";
import { useSnackbar } from "notistack";


export default function useShare() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const share = (text: string, url: string = window.location.href) => {
        if ((window.navigator as Navigator).canShare) {
            (window.navigator as Navigator).share({
                title: 'GRing',
                text,
                url
            }).catch(e => {
                console.error(e);
            });
        } else {
            copyToClipboard(url);
            const key = enqueueSnackbar('Скопировано в буфер обмена');

            setTimeout(() => {
                closeSnackbar(key);
            }, 3000);
        }
    };

    return share;
}
