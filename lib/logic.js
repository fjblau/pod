/**
 * Script file for Proof Of Delivery
 */

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.inet.pod.POPReceived} popReceived - the POPReceived transaction
 * @transaction
 */
async function POPReceived(popReceived) {  // eslint-disable-line no-unused-vars
  const NS = 'org.inet.pod';
  const popTO = popReceived.transportOrder;
  const popPop = popReceived.pop;
  const popReceivedBy = popReceived.popReceivedBy;
  popTO.pop = popPop;
  popTO.status = 'PICKED_UP';
  const transportOrderRegistry = await getAssetRegistry(NS + '.TransportOrder');
  await transportOrderRegistry.update(popTO);

}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.inet.pod.PODReceived} podReceived - the PODReceived transaction
 * @transaction
 */
async function PODReceived(podReceived) {  // eslint-disable-line no-unused-vars
  const NS = 'org.inet.pod';
  const podTO = podReceived.transportOrder;
  const podPod = podReceived.pod;
  const podReceivedBy = podReceived.podReceivedBy;
  podTO.pod = podPod;
  podTO.status = 'DELIVERED';
  const transportOrderRegistry = await getAssetRegistry(NS + '.TransportOrder');
  await transportOrderRegistry.update(podTO);

}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.inet.pod.GrReceived} grReceived - the GrReceived transaction
 * @transaction
 */
async function GrReceived(grReceived) {  // eslint-disable-line no-unused-vars
  const NS = 'org.inet.pod';
  const grTO = grReceived.transportOrder;
  const grGr = grReceived.gr;
  const grReceivedBy = grReceived.GrReceivedBy;
  grTO.gr = grGr;
  grTO.status = 'GOODS_RECEIVED';
  const transportOrderRegistry = await getAssetRegistry(NS + '.TransportOrder');
  await transportOrderRegistry.update(grTO);

}


/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.inet.pod.SetupDemo} setupDemo - the SetupDemo transaction
 * @transaction
 */
async function setupDemo(setupDemo) {  // eslint-disable-line no-unused-vars

    const factory = getFactory();
    const NS = 'org.inet.pod';

    // create the shipper
    const shipper = factory.newResource(NS, 'Shipper', 'shipper@email.com');
    const shipperAddress = factory.newConcept(NS, 'Address');
    shipperAddress.country = 'USA';
    shipper.address = shipperAddress;

    // create the carrier
    const carrier = factory.newResource(NS, 'Carrier', 'carrier@email.com');
    const carrierAddress = factory.newConcept(NS, 'Address');
    carrierAddress.country = 'UK';
    carrier.address = carrierAddress;

    // create the receiver
    const receiver = factory.newResource(NS, 'Receiver', 'receiver@email.com');
    const receiverAddress = factory.newConcept(NS, 'Address');
    receiverAddress.country = 'Panama';
    receiver.address = receiverAddress;

    // create the Transport Order
    const transportOrder = factory.newResource(NS, 'TransportOrder', 'TO_001');
    transportOrder.status = 'CREATED';
    transportOrder.shipper = factory.newRelationship(NS, 'Shipper', 'shipper@email.com');
    transportOrder.carrier = factory.newRelationship(NS, 'Carrier', 'carrier@email.com');
    transportOrder.receiver = factory.newRelationship(NS, 'Receiver', 'receiver@email.com');
    const tomorrow = setupDemo.timestamp;
    const delDate = setupDemo.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    delDate.setDate(delDate.getDate() + 3);
    transportOrder.expectedPickup = tomorrow; // the shipment has to be picked up tomorrrow
    transportOrder.expectedDelivery = delDate; // the shipment has to be delivered in 3 days

    // add the shipppers
    const shipperRegistry = await getParticipantRegistry(NS + '.Shipper');
    await shipperRegistry.addAll([shipper]);

    // add the carriers
    const carrierRegistry = await getParticipantRegistry(NS + '.Carrier');
    await carrierRegistry.addAll([carrier]);

    // add the receivers
    const receiverRegistry = await getParticipantRegistry(NS + '.Receiver');
    await receiverRegistry.addAll([receiver]);
  

    // add the transport orders
    const transportOrderRegistry = await getAssetRegistry(NS + '.TransportOrder');
    await transportOrderRegistry.addAll([transportOrder]);

}

/**
 * Initialize some test assets and participants useful for running a demo.
 * @param {org.inet.pod.AddTransportOrder} addTransportOrder - the SetupDemo transaction
 * @transaction
 */
async function addTransportOrder(addTransportOrder) {  // eslint-disable-line no-unused-vars

    const factory = getFactory();
    const NS = 'org.inet.pod';


    // create the Transport Order
    const transportOrder = factory.newResource(NS, 'TransportOrder', addTransportOrder.transportOrderNumber);
    transportOrder.status = 'CREATED';
    transportOrder.shipper = factory.newRelationship(NS, 'Shipper', 'shipper@email.com');
    transportOrder.carrier = factory.newRelationship(NS, 'Carrier', 'carrier@email.com');
    transportOrder.receiver = factory.newRelationship(NS, 'Receiver', 'receiver@email.com');
    const tomorrow = addTransportOrder.timestamp;
    const delDate = addTransportOrder.timestamp;
    tomorrow.setDate(tomorrow.getDate() + 1);
    delDate.setDate(delDate.getDate() + 3);
    transportOrder.expectedPickup = tomorrow; // the shipment has to be picked up tomorrrow
    transportOrder.expectedDelivery = delDate; // the shipment has to be delivered in 3 days

// add the transport orders
    const transportOrderRegistry = await getAssetRegistry(NS + '.TransportOrder');
    await transportOrderRegistry.addAll([transportOrder]);

}
