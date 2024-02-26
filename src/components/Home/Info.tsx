import { infoModalAtom } from "../../pages/Home";
import Modal from "../Modal";
import { useAtom } from "jotai";

const Info: React.FC = () => {
  const setInfoModalOpen = useAtom(infoModalAtom)[1];
  return (
    <Modal onClose={setInfoModalOpen} className="w-[85%] xl:w-[25%]">
      <div className="flex flex-col gap-1">
        <p>
          This site was built for the take-home challenge for the Hack the North
          2024 Frontend application.
        </p>
        <br />
        <p>Username: htn</p>
        <p>Password: htn</p>
        <br />
        <p>Created by Brandon Vo</p>
        <a
          href="https://github.com/brandon-vo/htn-frontend-challenge"
          target="_blank"
          rel="noreferrer"
          className="text-light-pink hover:text-medium-pink underline"
        >
          https://github.com/brandon-vo/htn-frontend-challenge
        </a>
      </div>
    </Modal>
  );
};

export default Info;
