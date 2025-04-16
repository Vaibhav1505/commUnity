

//   import React from 'react';
//   Drawer
// import AddUserIcon from "../assets/icons/userAddIcon";
  
//   export default function AddParticipantDrawer() {
//     const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
//     return (
//       <>
//         <Button isIconOnly className="bg-primary" onClick={onOpen}><AddUserIcon /></Button>
//         <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
//           <DrawerContent>
//             {(onClose) => (
//               <>
//                 <DrawerHeader className="flex flex-col gap-1">Add Participant</DrawerHeader>
//                 <DrawerBody>
//                   {/* Add your form elements here */}
//                   <p>Drawer body content goes here.</p>
//                 </DrawerBody>
//                 <DrawerFooter>
//                   <Button color="danger" variant="light" onPress={onClose}>
//                     Close
//                   </Button>
//                   <Button color="primary" onPress={onClose}>
//                     Add
//                   </Button>
//                 </DrawerFooter>
//               </>
//             )}
//           </DrawerContent>
//         </Drawer>
//       </>
//     );
//   }
