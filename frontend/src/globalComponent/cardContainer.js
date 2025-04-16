import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default function CardContainer({ children, title }) {
    return <div className="">
        <Card>
            <CardHeader>
                {title}
            </CardHeader>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    </div>
};
