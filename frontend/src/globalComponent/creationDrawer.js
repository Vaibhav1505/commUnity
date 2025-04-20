import { Button, useDisclosure } from "@nextui-org/react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/drawer";
import AddIcon from "../assets/icons/addIcon";

//we will create dynamic drawer later...because conflict between heroUI and nextUI caused issue in dynamic things


export default function CreationDrawer({ drawerTitle = "Create", children, drawerFor = "Data", onSubmit }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className="bg-primary font-semibold text-white"
        endContent={<AddIcon />}
        aria-label={`Create ${drawerFor}`}
        onPress={onOpen}>
        {`Create ${drawerFor}`}
      </Button>
      <Drawer
        size="lg"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">{drawerTitle}</DrawerHeader>
              <DrawerBody className="p-5">
                <section className="space-y-4">
                  {children}
                </section>
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={() => {
                  onSubmit();
                  onClose();
                }}>
                  Create
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
