#### Swagger api:
* http://localhost:3000


# The simlest way of adding new subscriber usage (Viber example):
* Add to SubscriberTypeEnum the name of your subscriber type (for example 'viber')
* Create `class ViberSubscriberDto extends RegisterSubscriberDto`
* Create `class ViberSubscriber extends BaseSubscriber<SubscriberTypeEnum.VIBER> implements IOnMessage`
* Add to SubsctiberController new route
* Define all your botstrap logic in `static ViberSubscriber.get(dto: VeberSubscriberDto): Promise<ViberSubscriber>`
* In ViberSubscriber's instance `onMessage(message: HealthReportDto)` define all logic about message sending and it's look
