import EventMemberListTile from "../../../../../components/eventMembersListtile"

export default function EventMembers({ eventUsers }) {
    if (!Array.isArray(eventUsers)) return null;

    return (
        <div>
            {eventUsers.map((user, index) => (
                <EventMemberListTile
                    key={index}
                    userName={`${user.firstname} ${user.lastname}`}
                    description={`${user.email}`}
                    imageSrc={user.imageSrc || "https://via.placeholder.com/150"}
                />
            ))}
        </div>
    );
}
