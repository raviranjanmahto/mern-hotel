import styled from "styled-components";
import { useUser } from "./useUser";
import SpinnerMini from "../../ui/SpinnerMini";
import Spinner from "../../ui/Spinner";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);

  & span {
    margin-right: 1rem;
  }
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

const UserAvatar = () => {
  const { user: { user: user = {} } = {}, isLoading } = useUser();
  const { fullName, avatar } = user;

  if (isLoading) return <Spinner />;

  return (
    <StyledUserAvatar>
      <Avatar
        src={avatar || "default-user.jpg"}
        alt={`Avatar of ${fullName}`}
      />
      <span>{fullName || <SpinnerMini />}</span>
    </StyledUserAvatar>
  );
};

export default UserAvatar;
